const ContactForm = require("../Models/contactForm")


exports.contactFormController = async (req,res)=>{
    try{
        const {firstName, lastName, email, phoneNumber, message} = req.body;
        if(!firstName || !email || !phoneNumber || !message){
            return res.status(401).json({
                success:false,
                message:"All fields are required !"
            })
        }
        const findUser = await ContactForm.findOne({email:email})
        if(findUser){
            return res.status(401).json({
                success:false,
                message:"You have already submit the form "
            })
        }

        const details = await ContactForm.create({firstName, lastName : lastName? lastName: "", email, phoneNumber,message})
        return res.status(200).json({
            success:true,
            message:"Contact form submitted successfully",
            contactDetails: details
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while creating the contact form in data base !",
            errorMessage:error.message
        })
    }
}