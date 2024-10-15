import React from 'react'
import { VscSignOut } from "react-icons/vsc"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../../Redux/Slices/loginSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAccountType, setCourseId, setProfileImage, setUserId } from '../../../Redux/Slices/userSlice'

function Logout() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const clicked = ()=>{
      navigate("/student-dashboard/profile")
    }
    const logoutHandler = ()=>{

        dispatch(setToken(null));
        localStorage.setItem("token", null)

        dispatch(setUserId(null))
        localStorage.setItem("userId", null)

        dispatch(setCourseId(null))
        localStorage.setItem("courseId", null)

        dispatch(setAccountType(null))
        localStorage.setItem("accountType", null)

        dispatch(setProfileImage(null))
        localStorage.setItem("profileImage", null)
        
        toast.success("Logout successful")
        navigate("/")
    }
  return (
    <div className=''>
            <div className='bg-white text-black lg:w-[400px] w-[325px] h-[180px] mt-[150px] lg:ml-[330px] ml-4 px-8 py-6 flex flex-col gap-6 rounded-xl'>
               
               <div className='flex gap-2 flex-col'>
                    <div className='flex gap-3 items-center'>
                        <p className='text-4xl text-red-600'><VscSignOut/></p>
                        <h1 className='text-2xl font-semibold'>Logout ?</h1>
                    </div>
                    <p className='pl-2'>Do you want to log out ?</p>
               </div>

               <div className='flex justify-end gap-4'>
                    <button onClick={logoutHandler} className='border-[1px] border-red-500 px-5 py-1 text-lg rounded-md hover:bg-red-600 hover:text-white transition-all duration-200'>Yes</button>
                    <button onClick={clicked} className='border-[1px] border-black px-5 py-1 rounded-md  hover:bg-black hover:text-white transition-all duration-200'>No</button>
               </div>
            </div>
    </div>
  )
}

export default Logout
