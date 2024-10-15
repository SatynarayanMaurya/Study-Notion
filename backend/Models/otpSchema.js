const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 20*60
    }
})


async function sendVerificationEmail (email,otp){
    try{
        const mailResponse = await mailSender(email, "Verification mail from the study notion", otp);
        // console.log("Email send successfully : ",mailResponse)
    }
    catch(error){
        console.log("error while sending the email in otp schema : ",error)
    }
} 


otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", otpSchema)