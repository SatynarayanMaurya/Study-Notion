const User = require("../Models/userSchema");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs")
const crypto = require('crypto');


exports.resetPasswordToken = async (req,res)=>{
    try{
        const {email} = req.body;

        if(!email){
            return res.status(401).json({
                success:false,
                message:"All fields are required !"
            })
        }

        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"User is not registered with us"
            })
        }

        // generate the token 
        const token = crypto.randomUUID();
        const updateUser = await User.findOneAndUpdate(
                                                        {email},
                                                        {
                                                            resetPasswordToken:token,
                                                            resetPasswordTokenExpires:Date.now() + 10 * 60 * 1000
                                                        },
                                                        {new:true}
                                                    )


        const genereateUrl = `http://localhost:3000/update-password/${token}`

        await mailSender(email, "Password update link from study notion", `Go to the link and update your password - ${genereateUrl}`)
        return res.status(200).json({
            success:true,
            message:"Reset Password link sent successfully on your email"
        })
    }

    
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Error while sending the reset Password Token !",
            errorMessage:error.message
        })
    }
}


exports.resetPassword = async (req,res)=>{
    try{
        const {password, confirmPassword , token} = req.body;
        if(!password || !confirmPassword || !token){
            return res.status(401).json({
                success:false,
                message:"Please fill all the required fieleds"
            })
        }

        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password not matched "
            })
        }

        const existingUser = await User.findOne({resetPasswordToken:token})
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"Invalid token received"
            })
        }
        if(Date.now() > existingUser.resetPasswordTokenExpires){
            return res.status(401).json({
                success:false,
                message:"Token is expired Please generate the token again"
            })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password,10);

        const updateUser = await User.findOneAndUpdate(
                                                            {resetPasswordToken:token},
                                                            {
                                                                password:hashedPassword
                                                            },
                                                            {new:true}
                                                    )


        return res.status(200).json({
            success:true,
            message:"Password updated successfully",
            updateUser
        })
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Error while reset the password ",
            errorMessage:error.message
        })
    }
}