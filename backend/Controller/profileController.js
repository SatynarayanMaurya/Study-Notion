const Profile = require("../Models/profileSchema")
const User = require("../Models/userSchema")
const bcrypt = require("bcryptjs");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, phoneNumber, about, currentPassword, changePassword } = req.body;

        const imageFile = req?.files?.imageFile;
        
        
        if (!dateOfBirth || !phoneNumber) {
            return res.status(401).json({
                success: false,
                message: "Please fill the required fields!"
            });
        }
        
        const email = req.user.email;
        if (!email) {
            return res.status(401).json({
                success: false,
                message: "Email not found, please check again"
            });
        }
        
        const user = await User.findOne({ email }).populate("profileDetails");
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found with that corresponding email"
            });
        }
        
        // Update name if provided
        if (firstName && lastName) {
            await User.findOneAndUpdate({ email }, { firstName, lastName }, { new: true });
        }
        
        // Password change logic
        if (currentPassword && changePassword) {
            const verifyPassword = await bcrypt.compare(currentPassword, user.password);
            if (verifyPassword) {
                const hashedPassword = await bcrypt.hash(changePassword, 10);
                await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Current password is incorrect!"
                });
            }
        }
        
        // Process and upload the file
        const profileId = user.profileDetails;
        if(imageFile){
            
            const uploadImage = await uploadImageToCloudinary(imageFile, process.env.STUDENT_FOLDER_NAME)
                await Profile.findByIdAndUpdate(
                                                    { _id: profileId._id },
                                                    {   
                                                        gender: gender || null, 
                                                        dateOfBirth, about: about || null, 
                                                        phoneNumber,
                                                        imageUrl:uploadImage.secure_url
                                                    },
                                                    { new: true }
                                                );
        }
        else{
            await Profile.findByIdAndUpdate(
                                                { _id: profileId._id },
                                                {   
                                                    gender: gender || null, 
                                                    dateOfBirth, 
                                                    about: about || null, 
                                                    phoneNumber
                                                },
                                                { new: true }
                                    );
        }
        
        
        
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in the profile controller!",
            errorMessage: error.message
        });
    }
};



exports.getAllProfileData = async (req,res)=>{
    try{
        const userId =  req.header("userId")
        if(!userId ){
            return res.status(401).json({
                success:false,
                message:"User id not found "
            })
        }
        const user = await User.findById({_id:userId}).populate("profileDetails")
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not found corresponding to the user id !"
            })
        }
        
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully ",
            user
        })
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Catch error while fetching all profile data",
            errorMessage:error.message
        })
    }
}
