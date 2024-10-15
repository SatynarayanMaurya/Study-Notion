import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../Services/apiConnector';
import { profileEndpoints } from '../../../Services/apis';
import { setLoading } from '../../../Redux/Slices/loginSlice';
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import Spinner from '../../../Components/Common/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

function EditProfileInstructor() {


  const token = useSelector((state)=>state.auth.token)
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [eyePassword, setEyePassword] = useState(false);
    const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false);
    const {register, handleSubmit, formState:{errors}} = useForm();
    const profileImage = useSelector((state)=>state.user.profileImage)
    const [imageFile , setImageFile ] = useState("");
    
    const imageFileHandler = (e)=>{
        const file = e.target.files[0];
        if(file){
            setImageFile(file)
        }
    }

    const cancelEditHandler = ()=>{
        navigate("/instructor-dashboard/profile")
    }

  const onSubmit =async (data)=>{
    try{
        data.imageFile = imageFile;
        dispatch(setLoading(true))
        const responce = await apiConnector("post", profileEndpoints.EDIT_PROFILE_API, data,{"Authorization":`Bearer ${token}`,'Content-Type': 'multipart/form-data'});
        console.log("Response is : ", responce)
        
        dispatch(setLoading(false))
        toast.success(responce.data.message)
        navigate("/instructor-dashboard/profile")
    }
    catch(error){
        console.log("You have find an error in edit profile of Instructor : ", error)
        dispatch(setLoading(false))
        toast.error(error.response.data.message)
        return;
    }
}






  return (
    <div className='flex flex-col lg:mt-0 mt-10'>
        {loading && <Spinner/>}
        <Link to={"/instructor-dashboard/profile"} className='lg:ml-10 ml-4 mt-4 cursor-pointer flex gap-1 items-center' >
            <p className='mt-1'><IoChevronBackOutline/></p>
            <p>Back</p>
        </Link>
      <p className='text-2xl font-semibold lg:ml-10 ml-4 mt-6'>Edit Profile</p>

      <div className='flex flex-col lg:ml-36 ml-4 lg:mt-10 mt-4 gap-4 h-full'>


        {/* Upper part  */}
        <div className='bg-[#21293a] py-4 lg:w-[650px] flex justify-between items-center lg:px-6 px-4 rounded-md'>

            <div className='flex gap-4 items-center'>

                <div className="w-[75px] h-[75px] rounded-full    ">

                    <img src={profileImage} alt="" className='rounded-full w-[70px] object-cover h-[70px] '  />

                </div>

                <div className='flex flex-col '>

                    <p className='text-[20px] font-semibold'>Change Profile Picture</p>
                    <div className='flex sm:gap-3 gap-3 items-center mt-4'>

                         <input id="file-upload" type="file" className="hidden" onChange={imageFileHandler} />
                         <label htmlFor="file-upload"  className="cursor-pointer px-3 py-2  text-white rounded-md shadow-sm bg-blue-700 focus:ring-blue-500">Change Profile Picture</label>

                    </div>

                </div>

            </div>

        </div>


        {/* middle part  */}
        <div className='bg-[#1e2534]  lg:h-[420px] lg:w-[650px] px-6 py-6 flex gap-4 flex-col rounded-md'>

           <div>
                <p className='text-lg font-semibold'>Profile Information</p>
           </div>

           <div>

                {/* form div  */}
                <div className='flex flex-col gap-6'>

                    {/* first and last name  */}
                    <div className='flex justify-between lg:items-center lg:flex-row flex-col lg:gap-0 gap-6'>
                        <div className='flex flex-col gap-2 items-start lg:w-[45%]'>
                            <label htmlFor="firstName">First Name<span className='text-red-500'>*</span></label>
                            <input type="text" {...register("firstName")} name='firstName' id='firstName' placeholder='Enter first name..' className='px-3 rounded-md py-2 bg-[#3d424e] text-[#cdd4e1] outline-none w-full' />
                        </div>
                        <div className='flex flex-col gap-2 items-start lg:mr-10'>
                            <label htmlFor="lastName">Last Name<span className='text-red-500'>*</span></label>
                            <input type="text" name='lastName' {...register("lastName")} id='lastName' placeholder='Enter last name..' className='px-3 rounded-md py-2 bg-[#3d424e] text-[#cdd4e1] outline-none w-full' />
                        </div>

                    </div>

                    {/* DOB  */}
                    <div className='flex lg:flex-row flex-col lg:gap-0 gap-6 justify-between lg:items-center '>

                        <div className='flex flex-col gap-2 items-start lg:w-[45%] '>
                            <label htmlFor="dateOfBirth">Date of Birth<span className='text-red-500'>*</span></label>
                            <input {...register("dateOfBirth",{required:true})} type="date" name='dateOfBirth' id='dateOfBirth' placeholder='Enter first name..' className='px-3 rounded-md py-2 bg-[#3d424e] text-[#cdd4e1] outline-none w-full' />
                            {errors.dateOfBirth && <p className='text-red-600'>Date of Birth is required*</p>}
                        </div>

                        <div className='flex flex-col gap-2 items-start '>
                            <div>
                                <p>Gender<span className='text-red-500'>*</span></p>
                            </div>

                            <div className='flex  gap-4 items-center px-3 rounded-md py-2 bg-[#464d5b] text-[#999DAA] outline-none '>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" name='gender' value={"male"} {...register("gender")} id='male' placeholder='Enter last name..' className='px-3 rounded-md py-2 bg-[#3d424e] text-[#cdd4e1] outline-none' />
                                    <label htmlFor="male" >Male</label>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" name='gender' value={"female"} id='female' {...register("gender")} placeholder='Enter last name..' className='px-3 rounded-md py-2 bg-[#3d424e] text-[#cdd4e1] outline-none' />
                                    <label htmlFor="female" >Female</label>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" name='gender' value={"other"} id='other' {...register("gender")} placeholder='Enter last name..' className='px-3 rounded-md py-2 bg-[#3d424e] text-[#cdd4e1] outline-none ' />
                                    <label htmlFor="other" >Other</label>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Phone no. ?  */}
                    <div className='flex lg:flex-row flex-col lg:gap-0 gap-6 justify-between lg:items-center '>
                        <div className='flex flex-col gap-2 items-start lg:w-[45%]'>
                            <label htmlFor="phoneNumber">Phone Number<span className='text-red-500'>*</span></label>
                            <div className='flex gap-2'>
                                <p className='px-3 py-2 bg-[#464d5b] rounded-lg text-[#cdd4e1] h-[41px]'>+91</p>
                                <div className='flex flex-col'>
                                    <input type="text" name='phoneNumber' {...register("phoneNumber",{required:true})} id='phoneNumber' placeholder='Enter first name..' className='px-3 rounded-md py-2 bg-[#3d424e] text-[#cdd4e1] outline-none w-full' />
                                    {errors.phoneNumber && <p className='text-red-600 mt-1'>Phone Number is important*</p>}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 items-start lg:w-[40%]'>
                            <label htmlFor="about">About<span className='text-red-500'>*</span></label>
                            <input type="text" name='about' id='about' {...register("about")} placeholder='Enter Bio Details...' className='px-3 rounded-md py-2 bg-[#3d424e] text-[#cdd4e1] outline-none w-full' />
                            
                        </div>

                    </div>

                    
                </div>
           </div>

        </div>

        {/* lower part  */}
        <div className='bg-[#21293a]  lg:h-[190px] lg:w-[650px] px-6 py-6 flex gap-4 flex-col rounded-md mb-12'>

                    <div className='flex lg:flex-row flex-col lg:gap-0 gap-5 justify-between'>
                        <div className='flex flex-col gap-2 relative lg:w-[45%]'>
                            <label htmlFor="currentPassword" className=' pl-1'>Current Password <span className='text-red-700'>*</span> </label>
                            
                            <input {...register("currentPassword")} type={eyePassword ?   "text":'password'} name='currentPassword' id='currentPassword' placeholder='Current Password...' className='text-[#cdd4e1] outline-none  bg-[#3d424e] px-3 pr-[60px] rounded-md py-2'   />
                            <p className='absolute right-6 top-[42px] text-xl' onClick={()=>setEyePassword(!eyePassword)}>{eyePassword ?  <PiEyeSlash/> : <PiEyeLight/>}</p>
                            
                        </div>
    
                        {/* Confirm Password  */}
                        <div className='flex flex-col gap-2 relative lg:w-[40%]'>
                            <label htmlFor="changePassword" className=' pl-1'>Change Password <span className='text-red-700'>*</span> </label>
                            <input {...register("changePassword")}  type={eyeConfirmPassword ?   "text":'password'} name='changePassword' id='changePassword' placeholder='Change Password...' className='text-[#cdd4e1] outline-none  bg-[#3d424e] px-3 pr-[60px] rounded-md py-2'/>
                            <p className='absolute right-6 top-[42px] text-xl' onClick={()=>setEyeConfirmPassword(!eyeConfirmPassword)}>{eyeConfirmPassword ?  <PiEyeSlash/> : <PiEyeLight/>}</p>
                        </div>
                    </div>

                    <div className='flex sm:gap-3 gap-3  mt-4 justify-end'>

                        <button onClick={cancelEditHandler} className='bg-[#3d424e] text-white sm:px-5 px-4 py-2 rounded-lg font-semibold '>Cancel</button>
                        <button type='submit'  onClick={handleSubmit(onSubmit)}  className='bg-[#ffd60a] text-black sm:px-5 px-4 py-2 rounded-lg font-semibold'>Save</button>

                    </div>

        </div>

      </div>
    </div>
  )
}

export default EditProfileInstructor
