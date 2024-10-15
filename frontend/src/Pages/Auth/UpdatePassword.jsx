import React from 'react'
import { useState } from 'react';
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import { apiConnector } from '../../Services/apiConnector';
import { endPoints } from '../../Services/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/Slices/loginSlice';
import Spinner from '../../Components/Common/Spinner';
import { useNavigate } from 'react-router-dom';


function UpdatePassword() {
  
  const [eyePassword, setEyePassword] = useState(false);
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false);
  const pathame = window.location.pathname
  const token = pathame.split("/").pop();
  const loading = useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [data, setData] = useState({
    password:"",
    confirmPassword:""
  })

  const changeHandler = (e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }



  const handleResetButton = async(data)=>{
    try{
        const newData = {
          password:data.password,
          confirmPassword:data.confirmPassword,
          token:token
        }
        dispatch(setLoading(true))
        const responce = await apiConnector("post", endPoints.RESET_PASSWORD_API, newData)
        dispatch(setLoading(false))
        toast.success(responce.data.message)
        navigate("/login")
    }
    catch(error){
      // console.log("finding an error in catch block of update password : ", error)
      toast.error(error.response.data.message)
      dispatch(setLoading(false))
      return ;
    }
  }

  return (
    <div className='flex justify-center items-center h-[89vh] bg-[#000814] '>

        {loading && <Spinner/>}
        <div  className='w-[340px] h-[350px] bg-[#0f151f] flex flex-col gap-4 text-white px-4 py-6 rounded-xl -mt-12'>

            <div className='flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Create new password</h1>
              <p className='text-[#AFB2BF] text-[12px]'>Here you enter your new password </p>
            </div>

            <div className='flex flex-col gap-2 relative'>
              <label htmlFor="password" className=' pl-1'>Password <span className='text-red-700'>*</span> </label>
              <input value={data.password} onChange={changeHandler} type={eyePassword ?   "text":'password'} name='password' id='password' placeholder='Password...' className='text-[#999DAA] outline-none  bg-[#283242] px-3 rounded-md py-2'/>
              <p className='absolute right-6 top-[43px] text-lg' onClick={()=>setEyePassword(!eyeConfirmPassword)}>{eyeConfirmPassword ?  <PiEyeSlash/> : <PiEyeLight/>}</p>
            </div>

            <div className='flex flex-col gap-2 relative'>
              <label htmlFor="confirmPassword" className=' pl-1'>Confirm Password <span className='text-red-700'>*</span> </label>
              <input value={data.confirmPassword} onChange={changeHandler}  type={eyeConfirmPassword ?   "text":'password'} name='confirmPassword' id='confirmPassword' placeholder='Confirm Password' className='text-[#999DAA] outline-none  bg-[#283242] px-3 rounded-md py-2'/>
              <p className='absolute right-6 top-[43px] text-lg' onClick={()=>setEyeConfirmPassword(!eyeConfirmPassword)}>{eyeConfirmPassword ?  <PiEyeSlash/> : <PiEyeLight/>}</p>
            </div>

            <button onClick={()=>handleResetButton(data)}  className='bg-[#ffd60a] text-black text-[14px] sm:px-8 px-4 py-2 rounded-lg font-semibold mt-3'>Reset Password</button>


        </div>
    </div>
  )
}

export default UpdatePassword
