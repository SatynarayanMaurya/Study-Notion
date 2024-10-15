const User = require("../Models/userSchema")
const Profile = require("../Models/profileSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const otpGenerator  = require("otp-generator")
const OTP = require("../Models/otpSchema")




exports.sendOtp = async (req,res,next)=>{
    try{
        const {email} = req.body;
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User already registered!"
            })
        }

        const otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false, specialChars:false})
        // console.log("Your otp is : ", otp);

        const responce = await OTP.create({email,otp})
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully",
            responce
        })
      

    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Catch error while sending otp "
        })
    }
}




exports.signup = async(req,res)=>{
    try{
        const {firstName, lastName, email, password, confirmPassword, accountType, otp} = req.body;

        if(accountType === "Instructor"){
            if(email !== "satynarayanmaurya113@gmail.com" || email !== "manojmaurya1123@gamil.com" ){
                return res.status(401).json({
                    success:false,
                    message:"You are not able to become an Instructor"
                })
            }
        }

        if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp) {
            return res.status(401).json({
                success:false,
                message:"All fields are required!"
            })
        }

        if(password !== confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password not matched"
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User already exist!"
            })
        }

        // Verify the otp that is the correct or not 
        const verifyOtp = await OTP.findOne({email}).sort({ createdAt: -1 });
        if(otp !== verifyOtp.otp){
            return res.status(401).json({
                success:false,
                message:"OTP not matched"
            })
        }

        const hashPassword = await bcrypt.hash(password,10)
        // console.log("hashed password : ", hashPassword);
        const image = `https://ui-avatars.com/api/?name=${firstName} ${lastName}`

        const profileDetail = await Profile.create(
                                                    {
                                                        gender:null, 
                                                        dateOfBirth:null, 
                                                        phoneNumber:null, 
                                                        about:null,
                                                        imageUrl:image
                                                    }
                                                );

        const user = await User.create({firstName,lastName, email, password:hashPassword,accountType,profileDetails:profileDetail._id})
        
        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            user:user
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong in sign up",
            errorMessage:error.message
        })
    }
}



exports.login = async(req,res)=>{
    try{
        const {email, password,accountType} = req.body;

        if(!email || !password || !accountType){
            return res.status(401).json({
                success:false,
                message:"All fields are required!"
            })
        }

        const user = await User.findOne({email}).populate("profileDetails");
        // console.log("THe existing user is : ",user)
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            })
        }

        if(user.accountType !== accountType){
            return res.status(401).json({
                success:false,
                message:"Account Type not matched"
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if(matchPassword){
            
            const token = await jwt.sign(
                {
                    email:user.email,
                    id:user._id,
                    accountType:user.accountType
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h"
                }
            )


            // user.token = token;
            // const tokenn  = user.token
            // console.log("Token is : ",user.token)
            // user.password = undefined

            const options = {
                expires:new Date(Date.now() + 3*24*60*60),
                httpOnly:true
            }
            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:"User login successfully",
                user:user,
                token:token
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password not matched"
            })
        }
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went wrong in login ",
            errorMessage:error
        })
    }
}