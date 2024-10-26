import React, { useState } from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { Bs1Circle } from "react-icons/bs";
import { Bs2Circle } from "react-icons/bs";
import { Bs3Circle } from "react-icons/bs";
import { SiTicktick } from "react-icons/si";
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../../Services/apiConnector';
import { instructorEndpoints } from '../../../../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../../Redux/Slices/loginSlice';
import Spinner  from "../../../../Components/Common/Spinner"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCourseId } from '../../../../Redux/Slices/userSlice';






function CourseInformation() {



  

  const { register, handleSubmit, formState: { errors } } = useForm();
  const token = useSelector((state)=>state.auth.token)
  const userId = useSelector((state)=>state.user.userId)
  const [fileName, setFileName ] = useState("");
  const loading = useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file);
    }
  };

  const onsubmit = async(data)=>{

    try{
        data.image = fileName;
        data.instructorId = userId;
        dispatch(setLoading(true))
        const response = await apiConnector("post", instructorEndpoints.CREATE_COURSE_API,data,{"Authorization":`Bearer ${token}`,'Content-Type': 'multipart/form-data',})
        dispatch(setLoading(false))

        dispatch(setCourseId(response.data.courseDetails._id))
        localStorage.setItem("courseId", response.data.courseDetails._id)
        
        toast.success(response.data.message)
        navigate("/instructor-dashboard/courses/courseInfo/section")
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error.response.data.message)
      return ;
    }
    
  }

  return (
    <div className='lg:px-8 px-4 py-6 flex lg:flex-row flex-col lg:gap-0 gap-6 justify-between text-[#d3d8e3] lg:mt-0 mt-10'>

          {loading && <Spinner/>}
          {/* Left Part  */}
          <div className='flex flex-col gap-6 lg:w-[60%]'>

              <Link to={"/instructor-dashboard/courses"} className='cursor-pointer  flex gap-1 items-center' >
                <p className='mt-1'><IoChevronBackOutline/></p>
                <p>Back to dashboard</p>
              </Link>

              <div className='lg:ml-[100px] ml-4 text-[#a6abb5]'>

                  <div className='flex items-center text-[25px] lg:ml-0 ml-2'>
                      <p className='text-yellow-400'><Bs1Circle/></p>
                      <p className='-mt-1 flex'>--------------<span className='your_element'>-------</span></p>
                      <p><Bs2Circle/></p>
                      <p className='-mt-[2px] flex'>--------------<span className='your_element'>-------</span></p>
                      <p><Bs3Circle/></p>
                  </div>

                  <div className='flex lg:gap-24 lg:text-[16px] text-[14px]'>
                    <p className='lg:-ml-12 text-[#dfdada]'>Course Information</p>
                    <p className=' '>Course Builder</p>
                    <p className='lg:ml-16 ml-10 lg:mr-0 mr-4'>Publish</p>
                  </div>
              </div>

              <div className='lg:px-8 px-4 py-4 bg-[#2c3648] rounded-lg'>
                    <form action="" onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-4 '>

                        <div className='flex flex-col gap-2 '>
                          <label htmlFor="courseTitle"className='ml-1' >Course Title<span className='text-red-500'>*</span> </label>
                          <input type="text" name='courseTitle' {...register("courseTitle",{required:true})} id='courseTitle' className='bg-[#3e4756] px-5 py-2 rounded-md text-[#b2b4b4] outline-none' placeholder='Enter Course Title' />
                          {errors.courseTitle && <p className='text-red-600'>Course title is important</p>}
                        </div>

                        <div className='flex flex-col gap-2 '>
                          <label htmlFor="courseDescription"className='ml-1' >Course Description<span className='text-red-500'>*</span> </label>
                          <textarea rows={4} name='courseDescription' {...register("courseDescription" ,{required:true})} id='courseDescription' className='bg-[#3e4756] px-5 py-2 rounded-md text-[#b2b4b4] outline-none' placeholder='Enter Description' />
                          {errors.courseDescription && <p className='text-red-600'>Course Description is important</p>}
                        </div>

                        <div className='flex flex-col gap-2'>
                          <label htmlFor="price"className='ml-1' >Price<span className='text-red-500'>*</span> </label>
                          <input type="text" name='price' id='price' {...register("price",{required:true})} className='bg-[#3e4756] px-5 py-2 rounded-md text-[#b2b4b4] outline-none' placeholder='₹     Enter Price' />
                          {errors.price && <p className='text-red-600'>Price is important </p>}
                        </div> 

                        <div className='flex flex-col gap-2'>
                          <label htmlFor="courseThumbnail"className='ml-1' >Course Thumbnail<span className='text-red-500'>*</span> </label>

                          <div id='courseThumbnail' className="flex gap-6 items-center justify-center bg-[#3e4756] rounded-lg h-[80px]">

                            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                            <label htmlFor="file-upload"  className="cursor-pointer px-4 py-2  text-white rounded-md shadow-sm bg-blue-700 focus:ring-blue-500">Upload File</label>
                            {fileName.name && <p className=" text-[#f3eaea]"> {fileName.name}</p>}
                          </div>
                        </div> 

                          <div className='flex justify-center '>
                            <button type='submit' className='bg-yellow-400 font-semibold mt-2 px-4 py-2 rounded-lg text-black '>Save and Next</button>
                            {/* <Link to={"/instructor-dashboard/courses/courseInfo/section"} className='bg-yellow-400 px-4 py-2 rounded-lg text-black '>Next</Link> */}
                          </div>
                    </form>
              </div>

          </div>

          {/* Right Part  */}
          <div className='lg:mr-2  lg:w-[37%] bg-[#2c3648] rounded-lg lg:h-[420px]'>
              <div className='pl-12 pr-8 py-8 flex flex-col gap-4'>
                <h1 className='text-xl font-semibold -ml-6'>⚡Course Upload Tips</h1>
                <div>
                  <ul className='list-disc  flex flex-col gap-2 '>
                    <li>  Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                  </ul>
                </div>
              </div>
          </div>
    </div>
  )
}

export default CourseInformation
