const {instance} = require("../Config/razorpay")
const User = require("../Models/userSchema")
const Course = require("../Models/CourseSchema")
const crypto = require('crypto');
exports.capturePayment = async (req,res)=>{
    try{
        const {courseId} = req.body;
        const userId = req.user.id;

        if(!courseId || !userId){
            return res.status(401).json({
                success:false,
                message:"userId or courseId not found"
            })
        }

        const userDetails = await User.findById({_id:userId})
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"User details not found corresponding to this user"
            })
        }

        const enrolledStudent = userDetails.courses.includes(courseId)
        if(enrolledStudent){
            return res.status(401).json({
                success:false,
                message:"User already enrolled in this course"
            })
        }
        const courseDetails = await Course.findById(courseId)
        if(!courseDetails){
            return res.status(401).json({
                success:false,
                message:"Course not found corresponding to the courseId"
            })
        }

        // create options 
        const options = {
            amount:courseDetails.price*100,
            currency:"INR",
            receipt:Math.random(Date.now()).toString(),
            notes:{
                courseId:courseId,
                userId
            }
        }

        const paymentResponce = await instance.orders.create(options)

        return res.status(200).json({
            success:true,
            message:"Payment captured successful",
            paymentResponce:paymentResponce,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while capturing the payment ",
            errorMessage:error.message
        })
    }
}



// Verfify the signature 
exports.verifySignature = async (req,res)=>{
    try{

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        const hmac = crypto.createHmac('sha256', process.env.PAZORPAY_SECRET);
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

       

        if (generated_signature === razorpay_signature) {

            const newPaymentResponse = await fetchPaymentDetails(razorpay_payment_id);

            const courseId = newPaymentResponse.notes.courseId
            const userId = newPaymentResponse.notes.userId

            const userDetails = await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId}})
    
            return res.status(200).json({
                success:true,
                message:"Payment successfull",
                userDetails:userDetails
            })
        }
        else {
            return res.status(400).json({
                success:false,
                message:"Invalid Signature",
            });
          }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Catch error while verifying the signature ",
            errorMessage:error.message
        })
    }
}


const fetchPaymentDetails = async (paymentId) => {
    if(!instance.payments){
        console.log("Not data founded")
    }
    return  await instance.payments.fetch(paymentId);
 };