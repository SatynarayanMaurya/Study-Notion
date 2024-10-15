import React, { useEffect, useState } from 'react'
import { BiPlusCircle } from "react-icons/bi";
import { VscEdit } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../Services/apiConnector';
import { instructorEndpoints } from '../../../Services/apis';
import { setCourseId } from '../../../Redux/Slices/userSlice';





function Mycourses() {

    const token = useSelector((state)=>state.auth.token)
    const [allCourses , setAllCourses ] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getAllCourses = async ()=>{
        try{
                const response = await apiConnector("get", instructorEndpoints.GET_COURSES_API, {}, {"Authorization":`Bearer ${token}`})  
                // console.log("YOur responces is : ",response.data.courses)
                setAllCourses(response.data.courses.courses.reverse())
        }
        catch(error){
            console.log("Error in catch block : ",error)
            return ;
        }
    }

    useEffect(()=>{
        getAllCourses()
    },[token])


    const courseClickHandler = (courseId)=>{
        // console.log("Your course id is : ", courseId)
        dispatch(setCourseId(courseId));
        localStorage.setItem("courseId", courseId)
        navigate("/instructor-dashboard/courses/courseInfo/section")
    }





  return (
    <div className='lg:ml-12 lg:mr-36 ml-4 mr-2  lg:mt-6 mt-16 flex flex-col gap-8'>

            <div className='flex justify-between items-center'>
                    <div className='flex flex-col lg:gap-3 gap-1'>
                        <p>Home / Dashboard / <span className='text-yellow-400'>Courses</span></p>
                        <p className='text-3xl font-semibold'>Courses</p>
                    </div>

                    <Link to={"/instructor-dashboard/courses/courseInfo"} className='flex gap-1 items-center text-black text-xl  bg-yellow-400 px-4 py-2 rounded-xl cursor-pointer'>
                        <p><BiPlusCircle/></p>
                        <p>New</p>
                    </Link>
            </div>

            {/* All courses part  */}
            <div className=' border border-[#647289] flex flex-col gap-6'>

                <div className=' px-6 py-4 flex justify-between items-center text-[#a0a6b4]  border-b border-[#647289]'>
                        <p>Courses</p>
                        <div className='lg:flex gap-[75px] lg:pr-4 hidden'>
                            <p className='pr-2 '>Duration</p>
                            <p>Price</p>
                            <p>Action</p>
                        </div>

                </div>

                <div className='flex flex-col gap-12 px-6 pb-4 '>

                    {allCourses.map((course,index)=>{
                        return <div className='flex lg:flex-row flex-col lg:gap-0 gap-4 justify-between items-center lg:border-none border-b border-[#647289] lg:pb-0 pb-6'  key={index}>

                                    <div className=' lg:w-[60%] flex lg:flex-row flex-col lg:gap-6 gap-4 lg:items-center cursor-pointer' onClick={()=>courseClickHandler(course._id)}>
                                            
                                            <img src={course.thumbnail} alt=""  className='rounded-lg lg:w-[200px] w-[300px] ' />

                                            <div className='flex items-start flex-col gap-1'>
                                                <h1 className='text-xl font-semibold'>{course.courseTitle}</h1>
                                                <p className='text-[#9b9da6] text-[14px]'>{course.courseDescription}</p>
                                                <p className='text-sm text-[#babdc6] mt-1'>Created at April 28 | 05:15 pm</p>
                                                <div className='flex gap-2  mt-2 px-3 rounded-lg items-center bg-yellow-900 text-yellow-300'>
                                                    <p><SiTicktick/></p>
                                                    <p>Published</p>
                                                </div>
                                            </div>
                                    </div>

                                    <div className='flex lg:gap-16 gap-32 justify-between'>
                                        <p className='lg:block hidden'>2hr 30 mins</p>
                                        <p className='lg:text-[16px] text-[20px] lg:font-normal font-semibold lg:text-white text-blue-500'>₹ {course.price}</p>
                                        <div className='flex gap-4 text-xl '>
                                            <p><VscEdit/></p>
                                            <p><RiDeleteBin6Line/></p>
                                        </div>
                                    </div>

                                </div>
                    })}








                    {/* Static course  */}
                    {/* <div className='flex justify-between items-center '>

                        <div className=' w-[60%] flex gap-4 items-center'>
                                
                                <img src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?cs=srgb&dl=pexels-pixabay-356056.jpg&fm=jpg" alt="" width={200} className='rounded-lg' />

                                <div className='flex items-start flex-col gap-1'>
                                    <h1 className='text-xl font-semibold'>Introduction to Design</h1>
                                    <p className='text-[#9b9da6]'>This course provides an overview of the design process, design thinking, and basic design principles.</p>
                                    <p className='text-sm text-[#babdc6] mt-1'>Created at April 28 | 05:15 pm</p>
                                    <div className='flex gap-2  mt-2 px-3 rounded-lg items-center bg-yellow-900 text-yellow-300'>
                                        <p><SiTicktick/></p>
                                        <p>Published</p>
                                    </div>
                                </div>
                        </div>

                        <div className='flex gap-16'>
                            <p>2hr 30 mins</p>
                            <p>₹ 3599</p>
                            <div className='flex gap-4 text-xl '>
                                <p><VscEdit/></p>
                                <p><RiDeleteBin6Line/></p>
                            </div>
                        </div>

                    </div> */}


                </div>
            </div>
    </div>
  )
}

export default Mycourses
