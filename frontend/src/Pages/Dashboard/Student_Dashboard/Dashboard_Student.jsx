import React, { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc"
import { GrCart } from "react-icons/gr";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { IoBookmarkOutline } from "react-icons/io5";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";


function Dashboard_Student() {


  const url = window.location.href.split("/")[4];
  const [profile, setProfile] = useState(url === "profile" ? true : false)
  const [endrolledCourses, setEnrolledCourses] = useState(url === "enrolled-courses" ? true : false)
  const [courses, setCourses] = useState(url === "courses" ? true : false)
  const [logout, setLogout] = useState(url === "logout" ? true : false)
  const [menuButton, setMenuButton] = useState(false)
    
  const menuButtonHandler = ()=>{
    setMenuButton(!menuButton);
  }


  const enrolledHandler = ()=>{
    setProfile(false)
    setEnrolledCourses(true)
    setCourses(false)
    setLogout(false)
  }

  const profileHandler = ()=>{
    setProfile(true)
    setEnrolledCourses(false)
    setCourses(false)
    setLogout(false)
  }

  const coursesHandler = ()=>{
    setProfile(false)
    setEnrolledCourses(false)
    setCourses(true)
    setLogout(false)
  }



  const logoutHandler = ()=>{
    
    setProfile(false)
    setEnrolledCourses(false)
    setCourses(false)
    setLogout(true)
  }

  return (
    <div className='flex relative'>
        
      <p className='text-3xl font-semibold absolute our_element bg-[#1b222f] w-[250px]  p-2 z-10' onClick={menuButtonHandler}><AiOutlineMenu/></p>
      {/* left side bar  */}
      <div className={`bg-[#1b222f] lg:w-[17%]  min-h-[90vh] py-5 ${menuButton ? "flex pt-12 absolute w-[250px]  transition-all duration-200": "your_element"} lg:flex  flex-col  text-[#838894]`}>
        
            <div className='flex flex-col w-full ]'>
                  <Link to={"/student-dashboard/profile"} className={`${profile ? "bg-yellow-800 bg-opacity-70 text-yellow-400 py-2 w-[100%] pl-10" : " py-2 w-[100%] pl-10"}`} onClick={profileHandler}>
                    <div className='flex gap-3 items-center'>
                        <p className='text-xl'><CgProfile/></p>
                        <p className=''>My Profile</p>
                    </div>
                  </Link>

                 <NavLink to={"/student-dashboard/enrolled-courses"}  className={`${endrolledCourses ? "bg-yellow-800 bg-opacity-70 text-yellow-400 py-2 w-[100%] pl-10" : " py-2 w-[100%] pl-10"}`} onClick={enrolledHandler}>
                  <div className='flex gap-3 items-center'>
                        <p className='text-xl'><MdOutlineCollectionsBookmark/></p>
                        <p className=''>Enrolled Courses</p>
                    </div>
                 </NavLink>

                 <NavLink className={" py-2 w-[100%] pl-10"}>
                  <div className='flex gap-3 items-center'>
                        <p className='text-xl'><IoBookmarkOutline/></p>
                        <p className=''>Whislist</p>
                    </div>
                 </NavLink>

                 <NavLink className={" py-2 w-[100%] pl-10"} >
                  <div className='flex gap-3 items-center'>
                        <p className='text-xl'><GrCart/></p>
                        <p className=''>Purchase History</p>
                    </div>
                 </NavLink>

                 <Link to={"/student-dashboard/courses"} className={`${courses ? "bg-yellow-800 bg-opacity-70 text-yellow-400 py-2 w-[100%] pl-10" : " py-2 w-[100%] pl-10"}`} onClick={coursesHandler}>
                  <div className='flex gap-3 items-center'>
                        <p className='text-xl'><HiOutlineAcademicCap/></p>
                        <p className=''>Courses</p>
                    </div>
                 </Link>



            </div> 

            <div className='border-t-[1px] w-full -ml-6 my-6'></div>

                 <Link to={"/student-dashboard/logout"} className={`${logout ? "bg-yellow-800 bg-opacity-70 text-yellow-400 py-2 w-[100%] pl-10" : " py-2 w-[100%] pl-10"}`} onClick={logoutHandler}>
                  <div className='flex gap-3 items-center'>
                        <p className='text-xl'><VscSignOut/></p>
                        <p className=''>Log out</p>
                    </div>
                 </Link>

            
      </div> 

      {/* Right side bar  */}
      <div className=' w-full  text-white'>
          <Outlet/>
      </div>

    </div>
  )
}

export default Dashboard_Student
