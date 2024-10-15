const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema")

exports.auth = async(req,res,next)=>{

    try{
        const authHeader = req.header("Authorization");
        const token = req.cookies.token || (authHeader ? authHeader.replace("Bearer ", "") : null)
        // const token = req.cookies.token;
        // console.log("Your middleware token is : ", token)

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found"
            })
        }
        // Decode the token
        try{
            const decode = await jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode;
            next();
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Error while validating token",
            errorMessage:error.message
        })
    }
}

exports.isStudent = async(req,res,next)=>{

    try{
        // const user 
        const userDetails =await User.findOne({email: req.user.email})
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Can't find the user!"
            })
        }

        if(userDetails.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for the student"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Account Type is not verified!"
        })
    }
}

exports.isAdmin = async(req,res,next)=>{

    try{
        const userDetails =await User.findOne({email: req.user.email})
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Can't find the user!"
            })
        }
        if(userDetails.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for the Admin only!"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Account Type is not verified!"
        })
    }
}

exports.isInstructor = async(req,res,next)=>{

    try{
        const userDetails =await User.findOne({email: req.user.email})
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Can't find the user!"
            })
        }
        if(userDetails.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for the Instructor only!"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Account Type is not verified!"
        })
    }
}