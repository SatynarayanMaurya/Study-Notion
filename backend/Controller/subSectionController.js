const Section = require("../Models/sectionSchema")
const SubSection = require("../Models/subSectionSchema")
const {uploadImageToCloudinary} = require("../utils/imageUploader")

exports.createSubSection = async (req,res)=>{
    try{
        const {title, timeDuration,sectionId } = req.body;
        const videoUrl = req.files.videoUrl;
        if(!videoUrl){
            return res.status(401).json({
                success:false,
                message:"Video url in not found"
            })
        }
        // console.log("Your video url is : ", videoUrl)
        if(!title || !sectionId){
            return res.status(401).json({
                success:false,
                message:"All fields are require",
            })
        }
        const uploadVideo = await uploadImageToCloudinary(videoUrl, process.env.VIDEO_SECTION_FOLDER_NAME)
        const subSectionDetails = await SubSection.create({title,timeDuration, videoUrl:uploadVideo.secure_url})
        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},{$push:{subSection:subSectionDetails._id}},{new:true}).populate("subSection")

        return res.status(200).json({
            success:true,
            message:"Subsection is created successfully ",
            subSectionDetails:subSectionDetails,
            updatedSection :updateSection
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while creating the subsections !",
            errorMessage:error.message
        })
    }
}


exports.getAllSubSections = async (req,res)=>{
    try{
        const sectionId= req.header("sectionId");
        if(!sectionId){
            return res.status(401).json({
                success:false,
                message:"Section id not found"
            })
        }

        const allSubSections = await Section.find({_id:sectionId}).populate("subSection")
        
        return res.status(200).json({
            success:true,
            message:"All subsection is fetched successfully ",
            allSubSections:allSubSections
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while fetching all the subsections",
            errorMessage:error.message
        })
    }
}