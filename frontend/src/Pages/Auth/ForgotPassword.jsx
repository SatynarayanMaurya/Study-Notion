import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { apiConnector } from '../../Services/apiConnector';
import { endPoints } from '../../Services/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../Redux/Slices/loginSlice';
import Spinner from '../../Components/Common/Spinner';
import { setResetPasswordEmail } from '../../Redux/Slices/signupSlice';
function ForgotPassword() {


    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const handleChange = (e)=>{
        setEmail(e.target.value)
    }

    const handleResetButton = async ()=>{

        try{
            dispatch(setLoading(true))
            const response = await apiConnector("post", endPoints.RESET_PASSWORD_TOKEN_API, {email})
            // console.log("You are send a success full responce : ",response)
            toast.success(response.data.message);
            dispatch(setResetPasswordEmail(email))
            dispatch(setLoading(false))
            navigate("/check-email")
        }
        catch(error){
            // console.log("Error in catch block of handle reset button : ", error)
            toast.error(error.response.data.message)
            dispatch(setLoading(false))
            return ;
        }
    }
  return (
    <div className='flex justify-center items-center h-[89vh] bg-[#000814] '>
        {loading && <Spinner/>}
        <div className='w-[340px] h-[300px] bg-[#0f151f] flex flex-col gap-6 text-white px-4 py-6 rounded-xl -mt-12'>

            <div className='flex flex-col gap-2'>
                <h1 className='text-xl font-semibold'>Reset your password</h1>
                <p className='text-[#AFB2BF] text-[12px]'>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
            </div>

            <div className='flex justify-center flex-col gap-4 px-2'>
                <input onChange={handleChange} value={email} type="email" placeholder='Enter email...' className='bg-[#2d2d3a] text-[#999DAA] outline-none px-3 rounded-md py-1' />
                <button onClick={handleResetButton} className='bg-[#ffd60a] text-black text-[14px] sm:px-8 px-4 py-2 rounded-lg font-semibold '>Reset Password</button>
            </div>

            <div onClick={()=>navigate("/login")} className='flex items-center  gap-2  rounded-xl'>
                <p className='text-lg '><GoArrowLeft/></p>
                <button  className=' rounded-lg  text-sm'>Back to login</button>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword
