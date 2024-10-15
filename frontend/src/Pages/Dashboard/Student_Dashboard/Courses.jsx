import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../Services/apiConnector';
import { studentEndpoints } from '../../../Services/apis';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../Components/Common/Spinner';
import { setLoading } from '../../../Redux/Slices/loginSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Courses() {

    const [allCourses, setAllCourses] = useState([])
    const token = useSelector((state)=>state.auth.token)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.auth.loading)
    const courseClickedHandler = async (courseId)=>{
        navigate(`/student-dashboard/courses/buy-course/${courseId}`)
    }

    const getAllCourses = async ()=>{
        try{
            dispatch(setLoading(true))
            const responce = await apiConnector("get", studentEndpoints.GET_ALL_COURSES_API ,{}, {"Authorization":`Bearer ${token}`})
            setAllCourses(responce.data.course)
            dispatch(setLoading(false))
        }
        catch(error){
            dispatch(setLoading(false))
            toast.error(error.response.data.message);
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
        {loading && <Spinner/>}
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
