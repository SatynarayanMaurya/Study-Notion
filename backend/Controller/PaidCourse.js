const User = require("../Models/userSchema")

exports.paidUser = async (req,res)=>{
    try{
        const {courseId} = req.body;
        

        const userId = req.user.id

        if(!userId || !courseId){
            return res.status(401).json({
                success:false,
                message:"User Id or CourseId not found"
            })
        }

        const updateUser = await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true})

        return res.status(200).json({
            success:true,
            message:"User updated successfully ",
            updatedUser :updateUser
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error whle set the paid user",
            errorMessage:error.message
        })
    }
}