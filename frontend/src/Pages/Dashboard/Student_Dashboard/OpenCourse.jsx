import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../../../Services/apiConnector'
import { instructorEndpoints, studentEndpoints } from '../../../Services/apis'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { setLoading } from '../../../Redux/Slices/loginSlice'
import Spinner from '../../../Components/Common/Spinner'
function OpenCourse() {

    const {courseId} = useParams()
    const [courseDetails, setCourseDetails] = useState([])
    const [sectionDetails, setSectionDetails] = useState([])
    const [subSectionDetails, setSubSectionDetails ] = useState([])
    const token = useSelector((state)=>state.auth.token)
    const loading = useSelector((state)=>state.auth.loading)
    const [ video, setVideo ] = useState("https://thumbs.dreamstime.com/b/falling-drop-rain-blue-earth-image-water-splash-crown-shape-water-splash-crown-shape-falling-drop-earth-140453719.jpg")
    const [fileType, setFileType] = useState("")
    const dispatch = useDispatch()
    const [isDropDown, setIsDropDown] = useState(
        new Array(10).fill(false)
    )

    const dropDownHandler = (sectionId,index)=>{
        const newDropDown = isDropDown.map((val,i)=>{
            return i===index ? !val :false
        })
        setIsDropDown(newDropDown)
        getSubSectionDetails(sectionId)
    }

    const getSubSectionDetails = async (sectionId)=>{
        try{
            dispatch(setLoading(true));
            const responce =await apiConnector("get", instructorEndpoints.GET_SUB_SECTION_API,{},{Authorization:`Bearer ${token}`,sectionId:sectionId})
            setSubSectionDetails(responce.data.allSubSections[0].subSection)
            // console.log("Your sub section responce is : ",responce.data.allSubSections[0].subSection)
            dispatch(setLoading(false));
        }
        catch(error){
            dispatch(setLoading(false));
            console.log("Catch error while fetching the sub section details : ",error)
            return;
        }
    }



    

    const getCourseDetails = async ()=>{
        try{
            dispatch(setLoading(true));
            const response = await apiConnector("get", studentEndpoints.GET_SINGLE_COURSE_WITH_COURSEID_API,{},{Authorization:`Bearer ${token}`, courseId:courseId} )

            setCourseDetails(response.data.courseDetails)
            setSectionDetails(response.data.courseDetails.section)
            dispatch(setLoading(false));
        }
        catch(error){
            dispatch(setLoading(false));
            console.log("Catch error while fetching the course details in play video component : ",error)
            return;
        }
    }

    const playVideo = (videoUrl)=>{
        console.log("Your video url is : ", videoUrl)
        const val = videoUrl.split(".").pop()
        setFileType(val)
        setLoading(true)

        setVideo(videoUrl)
        setLoading(false)

    }
    useEffect(()=>{
        getCourseDetails()
    },[])


  return (
    <div className='flex lg:flex-row flex-col lg:gap-0 gap-8 justify-between lg:mt-6 mt-12 lg:h-[88vh] lg:mb-0 mb-16'>
        { loading && <Spinner/>}
        {/* Side bar  */}
        <div className='lg:w-[36%] mt-2 ml-4 flex flex-col gap-3'>
               <div className='flex flex-col gap-3'>
                    <p className='text-3xl font-semibold'>{courseDetails.courseTitle}</p> 
                    <p className='text-[#838894] lg:text-[16px] text-[14px]'>{courseDetails.courseDescription}</p>
               </div>

               <div className='flex flex-col gap-3 mt-6'>
                    <p className='text-2xl font-semibold'>Sections : </p>
                    <div className='lg:ml-8 ml-2 flex flex-col gap-4 mt-3 lg:mr-0 mr-4'>

                        {
                            sectionDetails.map((section,index)=>{
                                return <div className='flex flex-col ' key={index}>
                                            <div className='flex justify-between items-center border border-t-0 border-l-0 border-r-0 pb-4'>
                                                <div className='flex lg:gap-2 gap-1 items-center '>
                                                    <p className='text-xl'>{index+1}.</p>
                                                    <p className='lg:text-xl text-lg '>{section.sectionName}</p>
                                                </div>
                                                <p className='text-2xl cursor-pointer ' onClick={()=>dropDownHandler(section._id,index)}>{isDropDown[index] ? <IoIosArrowDropup/> : <IoIosArrowDropdown/>}</p>
                                            </div>

                                            {/* subsection */}
                                            <div className={`mx-6 ${isDropDown[index] ? " flex flex-col":"hidden"}    `}>
                                
                                                {
                                                    subSectionDetails.map((subSection,index)=>{
                                                        return <div className='flex justify-between items-center border border-t-0 py-2 px-4' key={index}>
                                                                    <p>{subSection.title}</p>
                                                                    <button onClick={()=>playVideo(subSection.videoUrl)} className='text-blue-400'>Play</button>
                                                                </div>
                                                    })
                                                }
                
                                            </div>
                                        </div>
                            })
                        }
                        

                    </div>
                    
               </div>
        </div>
        
        {/* Video part */}
        <div className=' lg:w-[750px] w-[330px] lg:mr-4 lg:ml-0 ml-4'>
            
            {
                fileType === "mp4" ? <video src={video} controls controlsList="nodownload"  className='w-full h-[600px] bg-cover'></video>
                 : 
                <img src={video}  alt='Education image'  className='w-[100%]  bg-cover'></img>
            }
        </div>

    </div>
  )
}

export default OpenCourse
