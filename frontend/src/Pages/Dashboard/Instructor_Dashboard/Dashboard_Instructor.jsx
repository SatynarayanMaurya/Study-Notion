import React, { useState } from 'react'
import {  Outlet ,Link} from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { VscSignOut } from "react-icons/vsc"
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { AiOutlineMenu } from "react-icons/ai";


function Dashboard_Instructor() {

  const url = window.location.href.split("/")[4]

  const [profile, setProfile] = useState(url === "profile" ? true :false)
  const [logout, setLogout] = useState(url === "logout" ? true :false)
  const [myCourses, setMyCourses ] = useState(url === "courses" ? true :false)
  const [menuButton, setMenuButton] = useState(false)
    
  const menuButtonHandler = ()=>{
    setMenuButton(!menuButton);
  }

  const profileHandler = ()=>{
    setProfile(true)
    setLogout(false)
    setMyCourses(false)
  }


  const myCoursesHandler = ()=>{
    setProfile(false)
    setLogout(false)
    setMyCourses(true)
  }

  const logoutHandler = ()=>{
    
    setProfile(false)
    setLogout(true)
    setMyCourses(false)
  }

  return (
    <div className='flex relative'>

    <p className='text-3xl font-semibold absolute lg:hidden block bg-[#1b222f] w-[250px]  p-2 z-10' onClick={menuButtonHandler}><AiOutlineMenu/></p>

      {/* left side bar  */}
      <div className={`bg-[#1b222f] lg:w-[17%] min-h-[90vh] py-5 flex flex-col ${menuButton ? " pt-12 absolute w-[250px]  transition-all duration-200": "hidden"} lg:flex flex-col text-[#838894]`}>
        
            <div className='flex flex-col '>
                  <Link to={"/instructor-dashboard/profile"} className={`${profile ? "bg-yellow-800 bg-opacity-70 text-yellow-400 py-2 w-[100%] pl-10" : " py-2 w-[100%] pl-10"}`} onClick={profileHandler}>
                    <div className='flex gap-3 items-center'>
                        <p className='text-xl'><CgProfile/></p>
                        <p className=''>My Profile</p>
                    </div>
                  </Link>


                  <div className='border-t-[1px] w-full mt-4  '></div>

                  <p className='ml-12 mt-4 font-semibold text-[#c7ccd8] mb-1'>Instructor</p>

                 <Link to="/instructor-dashboard/courses"   className={`${myCourses ? "bg-yellow-800 bg-opacity-70 text-yellow-400 py-2 w-[100%] pl-10" : " py-2 w-[100%] pl-10"}`} onClick={myCoursesHandler}>
                  <div className='flex gap-3 items-center'>
                        <p className='text-xl'><HiOutlineAcademicCap/></p>
                        <p className=''>My Courses</p>
                    </div>
                 </Link>



            </div> 

            <div className='border-t-[1px] w-full  mb-6 mt-4'></div>

                 <Link to={"/instructor-dashboard/logout"} className={`${logout ? "bg-yellow-800 bg-opacity-70 text-yellow-400 py-2 w-[100%] pl-10" : " py-2 w-[100%] pl-10"}`} onClick={logoutHandler}>
                  <div className='flex gap-3 items-center'>
                        <p className='text-xl'><VscSignOut/></p>
                        <p className=''>Log out</p>
                    </div>
                 </Link>

            
            </div> 

      {/* Right side bar  */}
        <main className=' w-full  text-white'>
          <Outlet />
        </main>

    </div>
  )
}

export default Dashboard_Instructor
