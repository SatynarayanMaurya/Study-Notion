const Section = require("../Models/sectionSchema")
const User = require("../Models/userSchema")
const Course = require("../Models/CourseSchema")

exports.createSection = async(req,res)=>{
    try{
        const {sectionName, courseId} = req.body;
        const userId = req.user.id
        // console.log("Your user id   is : ",userId)


        if(!sectionName){
            return res.status(401).json({
                success:false,
                message:"Give a section name Please!"
            })
        }
        
        const sectionDetails = await Section.create({sectionName});

        const courseDetails = await Course.findByIdAndUpdate({_id:courseId},{ $push: { section: sectionDetails._id } },{new:true})

        return res.status(200).json({
            success:true,
            message:"Section created successfully ",
            sectionDetails,
            courseDetails,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while creating a section",
            errorMessage:error.message
        })
    }
}


exports.getAllSection = async (req,res)=>{
    try{
        const courseId = req.header("courseId");
        //  console.log("IN backend the course id is : ", courseId)
        if(!courseId){
            return res.status(401).json({
                success:false,
                message:"Course id is not found"
            })
        }

        const course = await Course.findById(courseId).populate("section")
        return res.status(200).json({
            success:true,
            message:"All section are fetched successfully",
            course
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while getting all the sections",
            errorMessage:error.message
        })
    }
}