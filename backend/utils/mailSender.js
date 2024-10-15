
const nodemailer = require("nodemailer")


const mailSender = async (email,title, body)=>{

    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS
                }
            })

            let info = await transporter.sendMail({
                from:"Study Notion of satyanarayan maurya",
                to:`${email}`,
                subject:`${title}`,
                html:`This is the otp for the registation on study notion ${body}`
            })

            // console.log("Email information is : ", info);
            return info;
        
    }
    catch(error){
        console.log("Error while sending the mail : ",error)
    }
}

module.exports = mailSender



