import React, { useEffect, useState } from 'react'
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
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
import { FiPlusCircle } from "react-icons/fi";
import { RiMenuAddFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import EditVideo from './EditVideo';



function CreateSection() {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const [addLecture , setAddLecture] = useState(false)
  const courseId = useSelector((state)=>state.user.courseId)
  const token = useSelector((state)=>state.auth.token)
  const [allSection, setAllSection ] = useState([])
  const [allSubSection , setAllSUbSection ] = useState([]);
  const loading = useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch();
  const [newSection , setNewSection] = useState(false)    // only for re-render the page again 
  
  const [addLectureSectionId , setAddLectureSectionId] = useState(null)
  const [dropDown, setDropDown] = useState(
    new Array(10).fill(false)
  );

  // Toggle function for a specific index
  const handleToggle = (index,sectionId) => {
    const updatedToggleStates = dropDown.map((state, i) =>
      i === index ? !state : false
    );
    setDropDown(updatedToggleStates);
    getSubSection(sectionId)
  };


  // Create section here
  const onsubmit = async (data)=>{
    try{
      data.courseId = courseId;

      dispatch(setLoading(true))
      const response = await apiConnector("post", instructorEndpoints.CREATE_SECTION_API, data,{"Authorization":`Bearer ${token}`})
      // console.log("Your responce of creating section is : ", response)
      dispatch(setLoading(false))
      toast.success(response.data.message)
      setNewSection(!newSection)
      reset();
    }
    catch(error){
      // console.log(("Catch error while creating the section : ",error));
      dispatch(setLoading(false))
      toast.error(error.response.data.message)
      return ;
    }
  }


    // Create sub section here
  const handleCreateSubSectionData =async (data)=>{
    try{
      data.sectionId = addLectureSectionId
      dispatch(setLoading(true))
      const response = await apiConnector("post", instructorEndpoints.CREATE_SUB_SECTION_API,data,{"Authorization":`Bearer ${token}`,'Content-Type': 'multipart/form-data'})
      dispatch(setLoading(false))
      toast.success(response.data.message)
      setNewSection(!newSection)
      // console.log("Your successful responces is : ",response)
    }
    catch(error){
      console.log("catch error while creating the subsection : ", error)
      toast.error(error.response.data.message)
      dispatch(setLoading(false))
    }
  }

  // For open the edit video part
  const addLectureHandler = (sectionId)=>{            // This is for adding sub sections
    setAddLecture(true)
    setAddLectureSectionId(sectionId)
  }

    // get all section here
  const getSections = async ()=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("get", instructorEndpoints.GET_SECTION_API, {}, {"Authorization":`Bearer ${token}`,"courseId":courseId});
      dispatch(setLoading(false))
      toast.success(response.data.message)
      setAllSection(response.data.course.section)
    }
    catch(error){
      // console.log("catch error in get section : ", error)
      dispatch(setLoading(false))
      toast.error(error.response.data.message)
      return;
    }
  }

  // Get all sub section here
  const getSubSection = async  (sectionId)=>{
    try{
        dispatch(setLoading(true))
        const response = await apiConnector("get", instructorEndpoints.GET_SUB_SECTION_API,{},{"Authorization":`Bearer ${token}`,"sectionId":sectionId})
        dispatch(setLoading(false))
        setAllSUbSection(response.data.allSubSections[0].subSection)
    }
    catch(error){
      console.log("Error while getting sub sections : ", error)
      toast.error(error.response.data.message)
      dispatch(setLoading(false))
      return;
    }
  }



  useEffect(()=>{
    getSections();
  },[newSection])

  return (
    <div className=' pl-4 pr-2  lg:px-8 lg:gap-0 gap-6 lg:flex-row flex-col lg:mt-0 mt-10 py-6 flex justify-between text-[#d3d8e3]'>


          {loading && <Spinner/>}
          {addLecture && <EditVideo closeAddLecture={()=>setAddLecture(false)} handleCreateSubSectionData={handleCreateSubSectionData} />}
          {/* Left Part  */}
          <div className='flex flex-col gap-6 lg:w-[60%]'>

              <Link to={"/instructor-dashboard/courses"} className='cursor-pointer flex gap-1 items-center' >
                <p className='mt-1'><IoChevronBackOutline/></p>
                <p>Back to dashboard</p>
              </Link>

              <div className='lg:ml-[100px] ml-4 text-[#a6abb5]'>

                  <div className='flex items-center text-[25px] lg:ml-0 ml-2'>
                      <p className='text-yellow-400'><SiTicktick/></p>
                      <p className='-mt-1 flex text-yellow-400'>------------<span className='lg:block hidden'>---------</span></p>
                      <p className='text-yellow-400'><Bs2Circle/></p>
                      <p className='-mt-1 flex '>--------------<span className='lg:block hidden'>-------</span></p>
                      <p><Bs3Circle/></p>
                  </div>

                  <div className='flex lg:gap-24 gap-8 lg:text-[16px] text-[14px]'>
                    <p className='lg:-ml-10 text-[#dfdada]'>Course Information</p>
                    <p className='lg:ml-4 lg:mr-0 mr-8 text-[#dfdada]'>Course Builder</p>
                    <p className='lg:ml-16 lg:mr-0 mr-12'>Publish</p>
                  </div>
              </div>

              <div className='lg:px-8 px-4 py-4 bg-[#141a27] rounded-lg'>
                    <form action="" onSubmit={handleSubmit(onsubmit)} className='flex flex-col gap-4 '>
                        
                        <p className='text-2xl font-semibold '>Course Builder</p>

                        <div className='flex flex-col gap-2 mt-2'>
                          <input type="text" name='sectionName' {...register("sectionName",{required:true})} id='sectionName' className='bg-[#3e4756] px-5 py-3 rounded-md text-[#cfd1d1] outline-none' placeholder='Add a section to build your course' />
                          {errors.sectionName && <p className='text-red-600'>Please give a section name</p>}
                        </div>


                          <div type="submit" className='flex justify-center lg:w-4/12 gap-2 text-lg items-center text-yellow-400  mt-2 px-4 py-2 rounded-lg border border-yellow-400'>
                            <p className='text-xl'>< FiPlusCircle /></p>
                            <button className=''>Create Section</button>
                          </div>
                    </form>

                    <div className='border-t mt-6 border-[#4f5669] -mb-6 lg:w-[750px] w-[330px] lg:-ml-8 -ml-4'></div>
                    {/* main div in which all the section is created */}
                    <div className='mt-12 flex flex-col gap-6'>


                      {allSection?.map ((section,index)=>{
                        return  <div className='border-b border-[#4f5669] pb-5' key={index}>

                                    <div className='flex justify-between items-center  '>
                                        
                                      <div className='flex justify-between items-center w-[93%]'>
                                          <div className='flex items-center gap-2 text-lg'>
                                            <p><RiMenuAddFill/></p>
                                            <p className='font-semibold'>{section.sectionName}</p>
                                          </div>

                                          <div className='flex lg:gap-6 gap-3 text-2xl items-center'>
                                            <p className='cursor-pointer'><MdModeEdit/></p>
                                            <p className='cursor-pointer'><RiDeleteBin6Fill/></p>
                                            <p className='text-[#a6abb5] lg:mr-0 mr-2'>|</p>
                                          </div>
                                        </div>

                                        <div onClick={(()=>handleToggle(index,section._id))} className='text-2xl cursor-pointer'>{!dropDown[index] ?<p> <IoIosArrowDropdown/></p> :<p><IoIosArrowDropup/> </p>}</div>
                                      </div>

                                      {/*first subsection  */}
                                      <div className={`${dropDown[index] ? "block" : "hidden"} pt-5 lg:px-8 px-4 `}>

                                      <div className='border-b '></div>

                                          {allSubSection?.map((subSection, index)=>{
                                            return <div className='flex justify-between items-center border border-t-0 py-3 px-5' key={index}>
                                                        <div className='flex  lg:w-[75%] justify-between lg:gap-3 gap-28 items-center'>
                                                          <p className='cursor-pointer  lg:w-[72%]'>{subSection.title} </p>
                                                          <a href={subSection.videoUrl} target='_blank' className='text-blue-500'>Play</a>
                                                        </div>
                                                        <div className='lg:flex hidden gap-4 text-2xl items-center'>
                                                          <p className='cursor-pointer'><MdModeEdit/></p>
                                                          <p className='cursor-pointer'><RiDeleteBin6Fill/></p>
                                                        </div>
                                                    </div>
                                          })}


                                        <div onClick={()=>addLectureHandler(section._id)} className=' text-lg  text-yellow-400 mt-3 rounded-lg '>
                                          <button className=''><span className='text-2xl'>+</span> Add Lecture</button>
                                        </div>
                                      </div>
                                </div>

                      })}




                    </div>
              </div>

              <div className='flex justify-end' onClick={()=>navigate("/instructor-dashboard/courses/courseInfo/section/publish")}>
                <button className='bg-yellow-400 font-semibold mt-2 px-4 py-2 rounded-lg text-black lg:w-3/12 '>Go to publish</button>
              </div>
              

          </div>

          {/* Right Part  */}
          <div className='mr-2  lg:w-[37%] bg-[#2c3648] rounded-lg lg:h-[420px]'>
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

export default CreateSection
