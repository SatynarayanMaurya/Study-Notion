import React, { useState } from 'react'
import SignupImage from "../../assets/Logo/Sign up image.jpg"

import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

import TextColor from '../../Components/Common/TextColor';
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form"

import {endPoints} from "../../Services/apis"
import { apiConnector } from '../../Services/apiConnector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData } from '../../Redux/Slices/signupSlice';
import { setLoading } from '../../Redux/Slices/loginSlice';
import Spinner from '../../Components/Common/Spinner';

function SignupPage() {

  const loading = useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {register, handleSubmit, formState:{errors}} = useForm();


  const [eyePassword, setEyePassword] = useState(false);
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false);



  const onSubmit =async (data)=>{
    
      try{
        if(data.password !== data.confirmPassword){
          toast.error("Password not Matched")
          return ;
        }
        dispatch(setSignupData(data))
        const email  = data.email
        dispatch(setLoading(true))
        const response = await apiConnector("post", endPoints.SENDOTP_API, {email});
        const result = response.data;
        toast.success(result?.message)
        dispatch(setLoading(false))
        navigate("/verify-email")
      }
      catch(error){
        toast.error(error?.response?.data?.message)
        dispatch(setLoading(false))
        return ;
      }

  }
  const onError = (errors) => {
    console.error(errors); 
  };


  return (

        <div className='sm:w-9/12 w-10/12 mx-auto flex lg:flex-row lg:gap-0 gap-6 flex-col-reverse lg:justify-between mt-6 lg:items-center'>
          {loading && <Spinner/>}
          <div className='lg:w-[39%] '>
              <h1 className='text-3xl font-bold sm:text-start text-center'>Join the millions learning to code with StudyNotion for free</h1>
              <div className='flex'>
                <div className='mt-4 sm:block hidden'>Build skills for today, tomorrow, and beyond. 
                  <div className='flex gap-2'>
                    <TextColor textColor={"blue-500"} text={"Education to "}/> 
                    <TextColor text={"future-proof your career."} textColor={"green-400"}/>
                  </div>
                 </div>
              </div>
  
              <form action="" onSubmit={handleSubmit(onSubmit,onError)} className='mt-4'>
  
                <div className='flex flex-col gap-4'>
  
  
                  {/* First and Last name  */}
                  <div className='flex lg:flex-row flex-col lg:items-center lg:gap-10 gap-4  '>
                    
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="firstName" className=' pl-1'>First Name<span className='text-red-500'>*</span></label>
                      <input type="text" {...register("firstName",{required:true})} name='firstName' id='firstName' placeholder='First name' className='text-[#999DAA] outline-none  bg-[#283242] px-3 rounded-md py-2'/>
                      {errors.firstName && <p className='text-red-500'>*First Name is required</p>}
                    </div>
  
                    <div className='flex flex-col gap-2'>
                      <label htmlFor="lastName" className=' pl-1'>Last Name<span className='text-red-500'>*</span></label>
                      <input type="text" {...register("lastName")} name='lastName' id='lastName' placeholder='Last name' className='text-[#999DAA] outline-none  bg-[#283242] px-3 rounded-md py-2'/>
                    </div>
  
                  </div>
  
  
                  {/* Email  */}
                  <div className='flex flex-col gap-2'>
                      <label htmlFor="email" className=' pl-1'>Email <span className='text-red-700'>*</span> </label>
                      <input type="text" {...register("email", {required:true})} name='email' id='email' placeholder='Email address' className='text-[#999DAA] outline-none bg-[#283242] px-3 rounded-md py-2'/>
                      {errors.email && <p className='text-red-500'>*Email is required</p>}
                  </div>
  
                  {/* Password  */}
                  <div className='flex flex-col gap-2 relative'>
                      <label htmlFor="password" className=' pl-1'>Password <span className='text-red-700'>*</span> </label>
                    
                      <input {...register("password" , {required:true})} type={eyePassword ?   "text":'password'} name='password' id='password' placeholder='Password' className='text-[#999DAA] outline-none  bg-[#283242] px-3 rounded-md py-2'   />
                      {errors.password && <p className='text-red-500'>*Password is required</p>}
                      <p className='absolute right-6 top-[42px] text-xl' onClick={()=>setEyePassword(!eyePassword)}>{eyePassword ?  <PiEyeSlash/> : <PiEyeLight/>}</p>
                      
                  </div>
  
                  {/* Confirm Password  */}
                  <div className='flex flex-col gap-2 relative'>
                      <label htmlFor="confirmPassword" className=' pl-1'>Confirm Password <span className='text-red-700'>*</span> </label>
                      <input {...register("confirmPassword", {required:true})} type={eyeConfirmPassword ?   "text":'password'} name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' className='text-[#999DAA] outline-none  bg-[#283242] px-3 rounded-md py-2'/>
                      {errors.confirmPassword && <p className='text-red-500'>*Confirm Password is required</p>}
                      <p className='absolute right-6 top-[42px] text-xl' onClick={()=>setEyeConfirmPassword(!eyeConfirmPassword)}>{eyeConfirmPassword ?  <PiEyeSlash/> : <PiEyeLight/>}</p>
                  </div>
  
  
                  <div className='flex flex-col gap-2 mb-2'>
                      <label htmlFor="accountType" className=' pl-1'>Account Type <span className='text-red-700'>*</span> </label>
                      <select name="accountType" id="accountType" {...register("accountType",{required:true})} className='text-[#999DAA] outline-none bg-[#283242] px-4 rounded-md py-2'>
                      <option value="Student">Student</option>
                      <option value="Instructor">Instructor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
  
                  
  
  
                  <button type='submit' className='px-5 py-2 rounded-lg font-semibold w-full bg-yellow-400 text-black'>Create Account</button>
                    
                </div>
                
              </form>
  
              <button onClick={()=>navigate("/login")} className='sm:mt-3 mt-5 lg:mb-4 mb-12 text-blue-500'>Login with their account</button>
          </div>
  
          <div className=' lg:w-[57%]'>
            <img src={SignupImage} alt=""  />
          </div>
  
      </div>)
}

export default SignupPage
