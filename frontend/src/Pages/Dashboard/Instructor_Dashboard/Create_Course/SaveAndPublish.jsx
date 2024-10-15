import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5"
import { Bs3Circle } from "react-icons/bs";
import { SiTicktick } from "react-icons/si";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SaveAndPublish() {


  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const navigate = useNavigate()


  const saveAndPublishHandler = ()=>{
    toast.success("Your course is public now ")
    navigate("/instructor-dashboard/courses")
  }


  return (
    <div className='pl-4 pr-2 lg:px-8 lg:gap-0 gap-6 lg:flex-row flex-col lg:mt-0 mt-10 py-6 flex justify-between text-[#d3d8e3]'>


          {/* Left Part  */}
          <div className='flex flex-col gap-6 lg:w-[60%]'>

              <Link to={"/instructor-dashboard/courses"} className='cursor-pointer flex gap-1 items-center' >
                <p className='mt-1'><IoChevronBackOutline/></p>
                <p>Back to dashboard</p>
              </Link>

              <div className='lg:ml-[100px] ml-4 text-[#a6abb5]'>
                  <div className='flex items-center text-[25px]'>
                      <p className='text-yellow-400'><SiTicktick/></p>
                      <p className='-mt-1 flex text-yellow-400'>------------<span className='lg:block hidden'>---------</span></p>
                      {/* <span className='-mt-1 text-yellow-400'>---------------------</span> */}
                      <p className='text-yellow-400'><SiTicktick/></p>
                      {/* <span className='-mt-1 text-yellow-400'>---------------------</span> */}
                      <p className='-mt-1 flex text-yellow-400'>------------<span className='lg:block hidden'>---------</span></p>
                      <p className='text-yellow-400'><Bs3Circle/></p>
                  </div>
                  <div className='flex lg:gap-24 gap-8 lg:text-[16px] text-[14px]'>
                    <p className='lg:-ml-12 text-[#dfdada]'>Course Information</p>
                    <p className='lg:ml-4 lg:mr-0 mr-8 text-[#dfdada]'>Course Builder</p>
                    <p className='lg:ml-16 lg:mr-0 mr-12 text-[#dfdada]'>Publish</p>
                  </div>
              </div>

              <div className='lg:px-8 px-4 py-4 bg-[#141a27] rounded-lg'>
                    <form action="" className='flex flex-col gap-4 pb-6'>
                        
                        <p className='lg:text-3xl text-2xl  '>Publish Setting</p>

                        <div className='flex gap-4 mt-2'>
                          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} name='checkbox'  id='checkbox' className='bg-[#3e4756] w-5 px-5 py-3 rounded-md text-[#cfd1d1] outline-none' />
                          <label htmlFor="" className='lg:text-xl'>Make this course public</label>
                        </div>

                    </form>

              </div>

              <div className='flex justify-between'>
                <div onClick={()=>navigate("/instructor-dashboard/courses/courseInfo/section")} className='flex gap-1 items-center bg-yellow-400 font-semibold mt-2 px-4 py-2 rounded-lg text-black cursor-pointer'>
                  <p className='text-xl'><IoChevronBackOutline/></p>
                  <button className=''>Back</button>
                </div>
                <button onClick={saveAndPublishHandler} className='bg-yellow-400 font-semibold mt-2 px-4 py-2 rounded-lg text-black'>Save & publish</button>
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

export default SaveAndPublish
