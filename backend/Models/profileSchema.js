const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
    },
    dateOfBirth:{
        type:Date,
    },
    phoneNumber:{
        type:Number
    },
    about:{
        type:String
    },
    imageUrl:{
        type:String
    }
})

module.exports = mongoose.model("Profile", profileSchema);