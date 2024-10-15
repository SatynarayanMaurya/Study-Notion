const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Admin", "Instructor", "Student"]
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordTokenExpires:{
        type:Date
    },
    profileDetails:{
        type: mongoose.Schema.Types.ObjectId,  // Storing ObjectId
        ref: 'Profile', 
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ]
})

module.exports = mongoose.model("User", userSchema);