const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    courseTitle:{
        type: String,
        required:true
    },
    courseDescription :{
        type:String,
        required:true
    },
    price:{
        type:String
    },
    thumbnail:{
        type:String
    },
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    section:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }]
})

module.exports = mongoose.model("Course", courseSchema)