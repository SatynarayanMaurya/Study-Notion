import React, { useState } from 'react'
import loginImage from "../../assets/Logo/login_page_image.jpg"
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

import TextColor from '../../Components/Common/TextColor';
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { endPoints } from '../../Services/apis';
import { apiConnector } from '../../Services/apiConnector';
import { useDispatch,useSelector} from 'react-redux';
import { setToken } from '../../Redux/Slices/loginSlice';
import { setLoading } from '../../Redux/Slices/loginSlice';
import Spinner from '../../Components/Common/Spinner';
import {  setAccountType, setUserId } from '../../Redux/Slices/userSlice';
function LoginPage() {


  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.auth.loading)
  const {register, handleSubmit, formState:{errors}} = useForm();

  const [eyePassword, setEyePassword] = useState(false);
  const navigate =  useNavigate();


  const onSubmit = async (data)=>{
    
    try{
      console.log("You data is : ",data)
      dispatch(setLoading(true))
      const responce = await apiConnector("post", endPoints.LOGIN_API, data)
      const result = responce.data;

      dispatch(setUserId(result.user._id))
      localStorage.setItem("userId", result.user._id)
      
      dispatch(setAccountType(data.accountType))
      localStorage.setItem("accountType", data.accountType)

      dispatch(setToken(result?.token))
      localStorage.setItem("token", result?.token)

      toast.success(result?.message) 
      dispatch(setLoading(false))
      if(result.user.accountType === "Student"){
        navigate("/student-dashboard/profile")     

      }
      else if( result.user.accountType === "Instructor"){
        navigate("/instructor-dashboard/profile")
      }

    }
    catch(error){
      console.log("find the error while login  : ",error)
        toast.error(error?.response?.data?.message)
        dispatch(setLoading(false))
        return ;
    }
    
  }
  const onError = (errors) => {
    console.error(errors); 
  };


  return (



    <div className='lg:w-9/12 w-10/12 mx-auto flex lg:flex-row lg:gap-0 gap-6 flex-col-reverse lg:justify-between lg:mt-20 mt-10 lg:items-center'>
        {loading && <Spinner/>}
        <div className='lg:w-[39%] '>
            <h1 className='text-3xl font-bold'>Welcome Back</h1>
            <div className='flex'>
              <div className='mt-4 lg:block hidden'>Build skills for today, tomorrow, and beyond. 
                <div className='flex gap-2'>
                  <TextColor textColor={"blue-500"} text={"Education to "}/> 
                  <TextColor text={"future-proof your career."} textColor={"green-600"}/>
                </div>
               </div>
            </div>

            <form action="" onSubmit={handleSubmit(onSubmit,onError)} className='mt-4'>

              <div className='flex flex-col gap-4'>


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
                    <button onClick={()=>navigate("/forgot-password")} className='text-end text-[12px] text-[#47A5C5]'>Forgot Password</button>
                </div>

                <div className='flex flex-col gap-2 -mt-3'>
                    <label htmlFor="accountType" className=' pl-1'>Account Type <span className='text-red-700'>*</span> </label>
                    <select name="accountType" id="accountType" {...register("accountType",{required:true})} className='text-[#999DAA] outline-none bg-[#283242] px-4 rounded-md py-2'>
                      <option value="Student">Student</option>
                      <option value="Instructor">Instructor</option>
                  </select>
                </div>



                <button type='submit' className='px-5 py-2 rounded-lg font-semibold w-full bg-yellow-400 text-black mt-2'>Sign in</button>
                  
              </div>
              
            </form>

            <button onClick={()=>navigate("/signup")} className='lg:mt-3 mt-5  text-blue-500'>Create Account</button>
        </div>

        <div className=' lg:w-[57%]'>
          <img src={loginImage} alt=""  />
        </div>

    </div>
  )
}

export default LoginPage
