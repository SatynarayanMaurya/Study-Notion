import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../Services/apiConnector';
import { endPoints } from '../../Services/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from '../../Redux/Slices/loginSlice';
import Spinner from '../../Components/Common/Spinner';

function EnterOtpPage() {
  
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.auth.loading)
    const [otp, setOtp] =useState("")
    const navigate = useNavigate()
    const handleChange = (value) => {
        setOtp(value);
    };

    const signupData = useSelector((state)=>state.signup.signupData)
    useEffect(()=>{
        if(signupData === null){
          navigate("/signup")
        }
    })


    
    const handleVerifyOtp =async ()=>{
      try{

          const {firstName, lastName, email, password,confirmPassword, accountType} = signupData;
          const newObject = {firstName, lastName,email,password,confirmPassword,accountType,otp}
          dispatch(setLoading(true))
          const responce = await apiConnector("post", endPoints.SIGNUP_API,newObject);
          toast.success(responce.data.message)
          dispatch(setLoading(false))
          navigate("/login")
      }
      catch(error){
        console.log("Error in catch block of otp page : ",error)
        toast.error(error?.response?.data?.message)
        dispatch(setLoading(false));
        return;
      }
    }

    const sendOtpAgain = async ()=>{
      try{
        const {email} = signupData;
        dispatch(setLoading(true));
        const response = await apiConnector("post", endPoints.SENDOTP_API,{email});
        const result = response.data;
        dispatch(setLoading(false));
        toast.success(result?.message)

      }
      catch(error){
        console.log("Error while sending otp again : ",error);
        dispatch(setLoading(false));
        toast.error(error?.response?.data?.message)
        return 
      }
    }
  
  return (
    <div className='flex justify-center items-center h-[89vh] bg-[#000814] '>
        {loading && <Spinner/>}
        <div className='w-[350px] h-[300px] bg-[#161D29] flex flex-col gap-6 text-white px-4 py-6 rounded-xl -mt-12'>

            <div className='flex flex-col gap-2'>
                <h1 className='text-xl font-semibold'>Verify email</h1>
                <p className='text-[#818491] text-[14px]'>A verification code has been sent to you. Enter the code below</p>
            </div>

            <div className=' flex  justify-center flex-col gap-5 '>
                <OTPInput 
                    value={otp}
                    onChange={handleChange}
                    numInputs={6}  
                    separator={<span >-</span>}  
                    isInputNum      
                    shouldAutoFocus 
                    // const renderInput = {(props) => <input {...props} />}
                    renderInput={(props) => (
                        <input
                          {...props}
                          placeholder="-"
                          style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                          className="w-[48px] lg:w-[45px] text-xl border-0 bg-[#2d2d3a] rounded-[0.5rem] py-2  text-center "
                        />
                      )}
                      containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                      }}
                     
                />
                <button onClick={handleVerifyOtp} className='bg-[#ffd60a] text-black text-[14px] sm:px-8 px-4 py-2 rounded-lg font-semibold '>Verify and Register</button>
            </div>

            <div className='flex text-white justify-between items-center'>
                <div onClick={()=>navigate("/login")} className='flex items-center  gap-2  rounded-xl'>
                    <p className='text-xl '><GoArrowLeft/></p>
                    <button  className=' rounded-lg  '>Back to login</button>
                </div>
                <div onClick={sendOtpAgain} className='flex items-center  gap-2  rounded-xl ;
'>
                    <p className='text-xl text-[#47A5C5]'><RxCountdownTimer/></p>
                    <button  className='   rounded-lg  text-[#47A5C5]'>Resend it</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default EnterOtpPage
