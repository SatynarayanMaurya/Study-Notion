import React, { useEffect } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../Services/apiConnector';
import { endPoints } from '../../Services/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from '../../Redux/Slices/loginSlice';
import Spinner from '../../Components/Common/Spinner';

function CheckEmail() {

    const email = useSelector((state)=>state.signup.resetPasswordEmail)
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.auth.loading)
    const navigate = useNavigate()


    useEffect(()=>{
        if(email === null){
            navigate("/forgot-password")
        }
    })

    const resendEmailHandler =async ()=>{

        try{
            dispatch(setLoading(true))
            const response = await apiConnector("post", endPoints.RESET_PASSWORD_TOKEN_API,{email});
            console.log("You send a link on the email again : ",response)
            toast.success(response.data.message)
            dispatch(setLoading(false))
        }
        catch(error){
            console.log("Error in catch block in check email : ", error)
            dispatch(setLoading(false))
            toast.error(error.response.data.message)
            return ;
        }
    }



  return (
    <div className='flex justify-center items-center h-[89vh] bg-[#000814] '>
        {loading && <Spinner/>}
        <div className='w-[340px] h-[220px] bg-[#0f151f] flex flex-col gap-6 text-white px-4 py-6 rounded-xl -mt-28'>

            <div className='flex flex-col gap-2'>
                <h1 className='text-xl font-semibold'>Check Email</h1>
                <p className='text-[#AFB2BF] text-[12px]'>We have sent the reset email to {email}</p>
            </div>

            <div className='flex justify-center flex-col gap-4 px-2'>
                <button onClick={resendEmailHandler} className='bg-[#ffd60a] text-black text-[14px] sm:px-8 px-4 py-2 rounded-lg font-semibold '>Resend Email</button>
            </div>

            <div onClick={()=>navigate("/login")}  className='flex items-center  gap-2  rounded-xl'>
                <p className='text-lg '><GoArrowLeft/></p>
                <button  className=' rounded-lg  text-sm'>Back to login</button>
            </div>
        </div>
    </div>
  )
}

export default CheckEmail
