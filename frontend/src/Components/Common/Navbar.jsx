import React, { useState } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {Link,NavLink, useNavigate} from "react-router-dom"
import { useSelector } from 'react-redux'


function Navbar() {

    const token = localStorage.getItem("token")
    const profileImage = useSelector((state)=>state.user.profileImage)
    const accountType = useSelector((state)=>state.user.accountType)
    const navigate = useNavigate();

  return (
    
    <div className='overflow-x-hidden sm:h-[70px] h-[60px] flex justify-between items-center border-b-2 border-[#2C333F]'>

        <div className='sm:w-10/12 w-11/12 mx-auto flex justify-between items-center '>

            <div>
                <Link to={"/"}><img src={logo} alt=""className='w-[130px] sm:w-[200px] sm:block hidden' /></Link>
            </div>

            <div className={`flex lg:gap-6 gap-4 `}>

                <NavLink to={"/"} className={({ isActive }) =>
                    isActive ? 'text-yellow-300 font-semibold text-lg' : 'text-white font-semibold text-lg'
                    }>Home
                </NavLink>

                <NavLink to={"/about"} className={({ isActive }) =>
                    isActive ? 'text-yellow-300 font-semibold text-lg' : 'text-white font-semibold text-lg'
                    }>About
                </NavLink>

                <NavLink to={"/contact"} className={({ isActive }) =>
                    isActive ? 'text-yellow-300 font-semibold text-lg' : 'text-white font-semibold text-lg'
                    }>Contact us
                </NavLink>
                
            </div>

            <div className='flex sm:gap-4 gap-2'>
                {
                    token === "null" ?(
                                <>  
                                    <button className='sm:px-4 px-2 py-1 hover:bg-[#303742] bg-[#1d242e]  rounded-lg border transition-all duration-200'><Link to={"/signup"} className='font-semibold sm:text-lg '>Signup</Link></button>
                                    <button className='sm:px-4 px-2 py-1 hover:bg-[#303742] bg-[#1d242e] rounded-lg border transition-all duration-200'><Link to={"/login"} className='font-semibold sm:text-lg'>Login</Link></button>
                                </>
                            ):
                            ( 
                                <div onClick={()=>navigate(`${accountType === "Student" ? "/student-dashboard/profile" : "/instructor-dashboard/profile"}`)} className='cursor-pointer'>
                                    <img src={profileImage} alt="" className='rounded-full w-[45px] h-[45px]' />

                                </div>
                            )
                }
                
            </div>
        </div>
    </div>
  )
}

export default Navbar
