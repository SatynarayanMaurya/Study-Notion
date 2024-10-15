import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../Services/apiConnector';
import { paymentIntegration, studentEndpoints } from '../../../Services/apis';
import { setLoading } from '../../../Redux/Slices/loginSlice';
import Spinner from '../../../Components/Common/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';


function BuyCourse() {

    var missingDependencies  = false
    const [ courseDetails, setCourseDetails ] = useState([])
    const {courseId} = useParams()
    const token = useSelector((state)=>state.auth.token)
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const buyCourseHandler = async ()=>{
        try{
            dispatch(setLoading(true))
            const data = await apiConnector("post", paymentIntegration.CAPTURE_PAYMENT, {"courseId":courseId}, {Authorization:`Bearer ${token}`})
            dispatch(setLoading(false))
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY, 
                amount: data.data.paymentResponce.amount,
                currency: data.data.paymentResponce.currency,
                name: "Study Notion",
                description: "Test Transaction",
                order_id: data.data.paymentResponce.id, 
                handler: async function  (response) {
                  try{
                    dispatch(setLoading(true))
                    const razorpayResponse = await apiConnector("post", paymentIntegration.VERIFY_SIGNATURE,{
                                                razorpay_order_id: response.razorpay_order_id,
                                                razorpay_payment_id: response.razorpay_payment_id,
                                                razorpay_signature: response.razorpay_signature},
                                            {Authorization:`Bearer ${token}`})
                    dispatch(setLoading(false))
                    toast.success(razorpayResponse.data.message)
                    // alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                    navigate("/student-dashboard/enrolled-courses")
                  }
                  catch(error){
                        dispatch(setLoading(false))
                        toast.error(error.response.data.message)
                        return;
                  }
                },
                prefill: {
                  name: "Your Name",
                  email: "email@example.com",
                  contact: "9999999999",
                },
                theme: {
                    color: "#F37254", // Customize color
                  },
              };

              const rzp1 = new window.Razorpay(options);
                rzp1.open();

        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error.response.data.message)
            return;
        }

    }

    const getCourseDetails =async()=>{
        try{
            dispatch(setLoading(true))
            const response = await apiConnector("get", studentEndpoints.GET_SINGLE_COURSE_WITH_COURSEID_API, {}, {"Authorization":`Bearer ${token}`, "courseId":courseId})
            dispatch(setLoading(false))
            setCourseDetails(response.data.courseDetails)


        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error.response.data.message)
            return ;
        }
    }

    useEffect(()=>{
        getCourseDetails()
    },[missingDependencies])


  return (
    <div>
        <div className='lg:ml-10 ml-4 lg:mt-4 mt-16 flex lg:flex-row flex-col lg:gap-0 gap-8  justify-between lg:mb-0 mb-8 '>
            
            {loading && <Spinner/>}

            {/* Left Part  */}
            <div className='flex flex-col lg:gap-6 gap-3 lg:w-[60%]'>
                <p>Home / Dashboard / Courses / <span className='text-yellow-500'>{courseDetails.courseTitle}</span></p>

                <p className='text-xl font-semibold lg:block hidden'>Welcome to become a member of Study notion family</p>

                <p className='lg:text-4xl text-3xl pb-1 font-semibold bg-gradient-to-r from-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent'>{courseDetails.courseTitle}</p>

                <div className='flex lg:gap-12 gap-10 items-center'>
                    <p className='flex gap-2 text-2xl items-center'><CiGlobe/> <span className='text-lg'>Hindi</span></p>
                    <p className='flex gap-3 items-center text-lg text-yellow-400'>4.5  <span className='text-2xl flex gap-3 -mt-1 text-yellow-600'> <FaStar/> <FaStar/> <FaStar/> <FaStar/> <FaStarHalfStroke/></span></p>
                </div>

                <div className='border-t-2  mt-3'></div>

                <div className='flex flex-col lg:gap-6 gap-2 '>
                    <p className='text-3xl font-semibold  bg-gradient-to-r from-[#de7777] to-[#190ccd] bg-clip-text text-transparent'>About Course</p>
                    <p className='pr-3 text-[#b6b9c1]'>{courseDetails?.courseDescription} </p>
                </div>

                <div className='flex flex-col gap-2 mt-4'>
                    <p className='text-xl font-semibold'>Term & Conditions</p>
                    <p className='lg:w-[50%] text-[#838894]'>You agree to share information entered on this page with Satynarayan Maurya (owner of this page) and Razorpay, adhering to applicable laws.</p>
                </div>
            </div>

            {/* Right part  */}
            <div className=' lg:w-[30%] lg:mr-20 mr-2 flex flex-col items-start gap-3 pt-2'>
                <img src={courseDetails?.thumbnail} alt="" width={350} className='rounded-lg w-[350px]' />

                <p className='text-2xl text-blue-500'>₹ {courseDetails.price} <span className='line-through text-[#cccaca] ml-4'> 4999</span></p>

                <div className='flex flex-col gap-2 pl-3'>
                    <p className='text-xl font-semibold -ml-3'>This Course includes:</p>

                    <div className='flex gap-4 items-centerr lg:mt-1'>
                        <p className='text-xl mt-[3px]'><IoMdCheckmarkCircleOutline/></p>
                        <p>No Pre-requisite Required</p>
                    </div>
                    <div className='flex gap-4 items-centerr lg:mt-1'>
                        <p className='text-xl mt-[3px]'><IoMdCheckmarkCircleOutline/></p>
                        <p>70+ video Lecture</p>
                    </div>
                    <div className='flex gap-4 items-center lg:mt-1'>
                        <p className='text-xl mt-[3px]'><IoMdCheckmarkCircleOutline/></p>
                        <p>MEGA Problem-Solving Classes</p>
                    </div>
                    <div className='flex gap-4 items-centerr lg:mt-1'>
                        <p className='text-xl mt-[3px]'><IoMdCheckmarkCircleOutline/></p>
                        <p>Live Resume & Interview Preparation</p>
                    </div>
                    <div className='flex gap-4 items-centerr lg:mt-1'>
                        <p className='text-xl mt-[3px]'><IoMdCheckmarkCircleOutline/></p>
                        <p>with Doubt Assistance</p>
                    </div>
                    <div className='flex gap-4 items-centerr lg:mt-1'>
                        <p className='text-xl mt-[3px]'><IoMdCheckmarkCircleOutline/></p>
                        <p>with Course Completion Certificate</p>
                    </div>
                </div>

                <button onClick={buyCourseHandler} className='bg-yellow-400 text-black px-6 py-2 my-3 rounded-full w-full font-semibold'>Buy Now</button>
            </div>
        </div>
    </div>
  )
}

export default BuyCourse
