const Course = require("../Models/CourseSchema")
const User = require("../Models/userSchema")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
require("dotenv").config();


exports.createCourse = async(req,res)=>{
    try{
        const {courseTitle , courseDescription, price,instructorId } = req.body;
        const image = req.files.image

        if(!courseTitle || !courseDescription || !price || !instructorId){
            return res.status(401).json({
                success:false,
                message:"All fields are required ?"
            })
        }

        const uploadDetails = await uploadImageToCloudinary(image, `${process.env.COURSES_FOLDER_NAME}`)
        const courseDetails = await Course.create(
                                                    {
                                                        courseTitle,
                                                        courseDescription,
                                                        price,
                                                        thumbnail:uploadDetails.secure_url,
                                                        instructorId
                                                    }
                                                )
        
        const userDetails = await User.findByIdAndUpdate({_id:instructorId},{$push:{courses:courseDetails._id}})
        return res.status(200).json({
            success:false,
            message:"Course created successfully",
            courseDetails: courseDetails,
            userDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while creating the course ?",
            errorMessage:error.message
        })
    }
}


// get courses with a particular user 
exports.getCourseWithCourseId = async (req,res)=>{
    try{
        const courseId = req.header("courseId")

        if(!courseId){
            return res.status(401).json({
                success:false,
                message:"Course Id not found ",
            })
        }

        const courseDetails = await Course.findById({_id:courseId}).populate("section");
        return res.status(200).json({
            success:true,
            message:"Course Fetched successfully",
            courseDetails:courseDetails
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while fetching the course corressponding to the course Id ", 
            errorMessage : error.message
        })
    }
}

exports.getCourses = async (req,res)=>{
    try{
       
            const userId = req.user.id;

            if(!userId){
                return res.status(401).json({
                    success:false,
                    message:"User id not found "
                })
            }
            const courseDetails = await User.findById({_id:userId}).populate("courses")
            return res.status(200).json({
                success:true,
                message:"Courses fetched successfully",
                courses:courseDetails
            })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while getting all the courses",
            errorMessage:error.message
        })
    }
}



// Here you can find all the courses which is created by all the instructor
exports.getAllCourses = async (req,res)=>{
    try{
        const allCourse = await Course.find({})
        return res.status(200).json({
            success:true,
            message:"All courses fetched successfully",
            course:allCourse
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while fetching all the courses created by all Instructor",
            errorMessage:error.message
        })
    }
}



