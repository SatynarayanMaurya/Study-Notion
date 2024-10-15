import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../Services/apiConnector';
import { studentEndpoints } from '../../../Services/apis';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Courses() {

    const [allCourses, setAllCourses] = useState([])
    const token = useSelector((state)=>state.auth.token)
    const navigate = useNavigate();
    const courseClickedHandler = async (courseId)=>{
        navigate(`/student-dashboard/courses/buy-course/${courseId}`)
    }

    const getAllCourses = async ()=>{
        try{
            const responce = await apiConnector("get", studentEndpoints.GET_ALL_COURSES_API ,{}, {"Authorization":`Bearer ${token}`})
            setAllCourses(responce.data.course)
        }
        catch(error){
            console.log("Error while fetching all the courses in student course section : ",error );
            return;
        }
    }

    const screenWidth = window.innerWidth;
    console.log(screenWidth);  // Outputs the width of the screen in pixels

    useEffect(()=>{
        getAllCourses();
    },[token])


  return (
    <div className='flex flex-col h-full lg:mt-0 mt-10'>
        <p className='lg:ml-10 ml-4 mt-4'>Home / Dashboard / <span className='text-yellow-400'>Courses</span></p>
        <p className='text-2xl font-semibold lg:ml-10 ml-4 lg:mt-6 mt-3'>Courses</p>

        <div className='lg:ml-10 ml-4 lg:mt-10 mt-5 flex flex-col'>

            <div className=' flex lg:mr-0 mr-1 justify-between items-center h-[50px] lg:pl-12 pl-5 lg:pr-48 pr-6 text-lg bg-[#2f3a4e] text-[#a0a6b4]'>
                <p>Courses Name</p>
                <p>Price</p>
            </div>

            {/* All courses  */}
            <div className='lg:mr-0 mr-1  ml-[1px]  flex flex-col '>


                {allCourses.map((course,index)=>{
                    return <div key={index}>
                                <div className='flex justify-between items-center py-4 border border-[#647289] lg:pl-10 pl-4 lg:pr-44 pr-6 border-t-0'>
                                    <div onClick={()=>courseClickedHandler(course._id)} className='flex lg:flex-row flex-col gap-4 lg:items-center cursor-pointer lg:w-[75%] w-[83%]'>
                                        <img src={course?.thumbnail} alt=""  className='rounded-md lg:w-[200px] w-[170px]' />
                                        <div className='flex flex-col  '>
                                            <p className='text-lg font-semibold'>{course?.courseTitle}</p>
                                            <p className='text-[#8f939b] lg:text-[16px] text-[14px]'>{course?.courseDescription.length > 70 ? `${screenWidth > 768 ? course?.courseDescription : `${course?.courseDescription.substring(0,70)}...`}` : course?.courseDescription} </p>
                                        </div>
                                    </div>

                                    <div className=''>
                                        <p> ₹ {course.price}</p>
                                    </div>
                                </div>
                            </div>
                })}

            </div>

        </div>

  </div>
  )
}

export default Courses
