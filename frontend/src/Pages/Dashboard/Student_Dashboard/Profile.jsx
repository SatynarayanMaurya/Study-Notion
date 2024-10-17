import React, { useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../Services/apiConnector';
import { profileEndpoints } from '../../../Services/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLoading } from '../../../Redux/Slices/loginSlice';
import Spinner from '../../../Components/Common/Spinner';
import { setProfileImage } from '../../../Redux/Slices/userSlice';
import { useNavigate } from 'react-router-dom';
function Profile() {


    const token = useSelector((state)=>state.auth.token)

    var missingDependencies  = false
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()
    const [userData , setUserData] = useState({})
    const [profileData,setProfileData] = useState({})
    const userId = useSelector((state)=>state.user.userId)
    const navigate = useNavigate()

    const getProfileData = async()=>{
        try{
            dispatch(setLoading(true))
            const responce = await apiConnector("get", profileEndpoints.GET_PROFILE_DETAILS_API ,{},{"Authorization":`Bearer ${token}`, "userId":`${userId}`})
            dispatch(setLoading(false))
            setUserData(responce.data.user);
            setProfileData(responce.data.user.profileDetails)

            dispatch(setProfileImage(responce.data.user.profileDetails?.imageUrl))
            localStorage.setItem("profileImage", responce.data.user.profileDetails?.imageUrl)
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error.response.data.message)
            if(error.response.data.message === "Token is invalid"){
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

            navigate("/")
      }
            return;
        }
    }

    useEffect(()=>{
            getProfileData();
    },[missingDependencies])

  return (
    <div className='flex flex-col h-full lg:mt-0 mt-10'>
        {loading && <Spinner/>}

      <p className='lg:ml-10 ml-4 mt-4'>Home / Dashboard / <span className='text-yellow-400'>Profile</span></p>
      <p className='text-2xl font-semibold lg:ml-10 ml-4 lg:mt-6 mt-3'>My Profile</p>

      <div className='flex flex-col lg:ml-36 ml-4 lg:mt-10 mt-4  h-full gap-4'>

        {/* Upper part  */}
        <div className='bg-[#2C333F] py-4 lg:mr-0 mr-2 lg:w-[650px] flex justify-between items-center lg:px-6 px-2 rounded-md'>

            <div className='flex lg:gap-4 gap-1 items-center'>

                <div className="w-[75px]  rounded-full  ">

                    <img src={profileData?.imageUrl} alt="" className='rounded-full  w-[70px] h-[70px]'  />

                </div>

                <div className='flex flex-col '>

                    <p className='text-[20px] font-semibold'>{userData.firstName} {userData.lastName}</p>
                    <p className='text-[14px] text-[#989da8]'>{userData.email}</p>

                </div>

            </div>

            <button  onClick={()=>navigate("/student-dashboard/profile/editProfile")} className='lg:flex hidden gap-2 bg-yellow-400 px-4 py-1 items-center rounded-lg text-black' >
                <p className='text-lg'><FiEdit/></p>
                <p className='text-md'>Edit</p>
            </button>
        </div>
        
        {/* Personal details  */}
        <div className='bg-[#2C333F] lg:mr-0 mr-2 rounded-md  min:h-[380px] lg:w-[650px] lg:px-6 px-2 py-6  flex gap-6 flex-col'>

            <div className='flex justify-between '>
                <p>Personal Details</p>
                <button  onClick={()=>navigate("/student-dashboard/profile/editProfile")} className='flex gap-2 bg-yellow-400 px-4 py-1 items-center rounded-lg text-black' >
                    <p className='text-lg'><FiEdit/></p>
                    <p className='text-md'>Edit</p>
                </button>
            </div>

            <div className='  flex flex-col lg:gap-8 gap-6'>

                <div className='flex '>
                    <div className='flex flex-col gap-1  w-[55%] '>
                        <p className='text-[14px] text-[#989da8]'>First Name</p>
                        <p className='text-[#e7eaf0]'>{userData.firstName}</p>
                    </div>
                    <div className='flex flex-col  gap-1 '>
                        <p className='text-[14px] text-[#989da8]'>Last Name</p>
                        <p className='text-[#e7eaf0]'>{userData.lastName}</p>
                    </div>
                </div>

                <div className='flex lg:flex-row flex-col lg:gap-0 gap-6'>
                    <div className='flex flex-col  gap-1 w-[55%]'>
                        <p className='text-[14px] text-[#989da8]'>Email</p>
                        <p className='text-[#e7eaf0]'>{userData.email}</p>
                    </div>
                    <div className='flex flex-col  gap-1 '>
                        <p className='text-[14px] text-[#989da8]'>Account Type</p>
                        <p className='text-[#e7eaf0]'>{userData.accountType}</p>
                    </div>
                </div>

                <div className='flex '>
                    <div className='flex flex-col gap-1 w-[55%]'>
                        <p className='text-[14px] text-[#989da8]'>Gender</p>
                        <p className='text-[#e7eaf0]'>{profileData.gender ? profileData.gender : "null"}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[14px] text-[#989da8]'>Date of Birth</p>
                        <p className='text-[#e7eaf0]'>{profileData.dateOfBirth ? (profileData.dateOfBirth)?.substring(0,10) : "null"}</p>
                    </div>
                </div>

                <div className='flex justify-between '>
                    <div className='flex flex-col gap-1  '>
                        <p className='text-[14px] text-[#989da8]'>Phone NO.</p>
                        <p className='text-[#e7eaf0]'>{profileData.phoneNumber ? profileData.phoneNumber : "null"}</p>
                    </div>
                    <div className='flex flex-col gap-1 w-[45%]'>
                        <p className='text-[14px] text-[#989da8]'>About</p>
                        <p className='text-[#e7eaf0]'>{profileData.about ? profileData.about :"null"}</p>
                    </div>
                </div>

            </div>
        </div>

        
      </div>
      
    </div>
  )
}

export default Profile
