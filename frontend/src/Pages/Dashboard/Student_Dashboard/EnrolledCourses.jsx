import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiConnector } from '../../../Services/apiConnector'
import { instructorEndpoints } from '../../../Services/apis'
import { setLoading } from '../../../Redux/Slices/loginSlice'
import { toast } from 'react-toastify'
import Spinner from '../../../Components/Common/Spinner'
import { useNavigate } from 'react-router-dom'

function EnrolledCourses() {

  const [missingDependency, setMissingDependency] = useState(false)
  const token = useSelector((state)=>state.auth.token)
  const [userCourses, setUserCourses] = useState([])
  const loading = useSelector((state)=>state.auth.loading)
  const dispatch  = useDispatch()
  const navigate = useNavigate()

  const getUserDetails = async ()=>{
    try{
        dispatch(setLoading(true))
        const response = await apiConnector("get", instructorEndpoints.GET_COURSES_API, {}, {"Authorization":`Bearer ${token}`})
        dispatch(setLoading(false))
        setUserCourses(response.data.courses.courses)
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error.response.data.message)
      return;
    }
  }
  
  const screenWidth = window.innerWidth;
  console.log(screenWidth); 

  useEffect(()=>{
    getUserDetails()
  },[missingDependency])

  const videoClicked = (courseId)=>{
    navigate(`/student-dashboard/enrolled-courses/course/${courseId}`)
  }

  return (
    <div className='flex flex-col h-full lg:mt-0 mt-10'>

      {loading && <Spinner/>}


      <p className='lg:ml-10 ml-4 mt-4'>Home / Dashboard / <span className='text-yellow-400'>Enrolled Courses</span></p>
      <p className='text-2xl font-semibold lg:ml-10 ml-4 lg:mt-6 mt-3'>Enrolled Courses</p>

      <div className='lg:ml-10 ml-4 lg:mt-10 mt-5 flex flex-col'>

        <div className=' flex lg:mr-0 mr-1 justify-between items-center h-[50px] lg:pl-12 pl-5 lg:pr-48 pr-6 text-lg bg-[#2f3a4e] text-[#a0a6b4]'>
            <p>Courses Name</p>
            <p>Durations</p>
        </div>

        {/* All Enrolled courses  */}
        <div className='  lg:ml-[1px] lg:mr-0 mr-1 flex flex-col mb-8'>

          { userCourses.length === 0 ? 
                (<p className='text-4xl text-center font-semibold my-8 bg-gradient-to-r from-[#98e4f2] to-[#6ce69e] bg-clip-text text-transparent'> No Courses Here </p>) :
                (
                  userCourses.map((course,index)=>{
                    return <div className='flex justify-between items-center py-5  border border-[#647289] lg:pl-10 pl-6 lg:pr-44 pr-2 border-t-0' key={index}>
                              <div className='flex lg:flex-row flex-col lg:gap-8 gap-4 lg:items-center cursor-pointer w-[71%] ' onClick={()=>videoClicked(course._id)}>
                                  <img src={course?.thumbnail} alt="" className='rounded-lg lg:w-[220px] w-[180px]' />
                                  <div className='flex flex-col  '>
                                      <p className='text-2xl font-semibold'>{course.courseTitle}</p>
                                      <p className='text-[#8f939b] lg:text-[16px] text-[14px]'>{course?.courseDescription.length > 70 ? `${screenWidth > 768 ? course?.courseDescription : `${course?.courseDescription.substring(0,70)}...`}` : course?.courseDescription} </p>
                                  </div>
                              </div>
              
                              <div>
                                <p>2 hr 45 mins</p>
                              </div>
                          </div>
                  })
                )
          }


         
        </div>

      </div>

    </div>
  )
}

export default EnrolledCourses
