import React from 'react'
import logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../assets/TimeLineLogo/Logo4.svg"
import timelimeImage from "../../assets/Images/TimelineImage.png"

const timelines = [
    {
        logo:logo1,
        heading:"Leadership",
        description:"Fully committed to the success company"
    },
    
    {
        logo:logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority"
    },
    {
        logo:logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills"
    },
    {
        logo:logo4,
        heading:"Solve the Problem",
        description:"Code your way to a solution"
    },

]
function Timeline() {
  return (
    
    <div className='flex sm:flex-row flex-col sm:gap-16 gap-8 items-center'>
        {/* Left part  */}
      <div className='flex sm:gap-12 gap-8 flex-col'>
            {
                timelines.map((timeline,index)=>{
                    return <div key={index} className='flex sm:gap-12 gap-6 items-center '>

                                <div>
                                    <img src={timeline.logo} alt="" width={25}/>
                                </div>

                                <div className='flex flex-col  '>
                                    <h1 className='font-bold text-md sm:text-lg'>{timeline.heading}</h1>
                                    <p className='text-[#2C333F] text-xs sm:text-[16px]'>{timeline.description}</p>
                                </div>

                            </div>
                })
            }
      </div>

      {/* Right Part  */}
      <div className='relative'>
            <img src={timelimeImage} alt="" />

            <div className='absolute  sm:top-[480px] top-[200px] sm:left-20 left-2 sm:w-[530px] w-[285px] bg-[#014A32] flex justify-between sm:px-12 px-2 items-center sm:h-[100px] h-[60px] text-[#05A77B]'>
                <div className='flex justify-between  sm:gap-16 gap-4 items-center  pr-4'>
                    <h1 className='sm:text-3xl text-2xl font-bold text-white'>10</h1>
                    <p className='font-semibold sm:text-md text-sm'>Year <br /> Experiences</p>
                </div>
                <div className='sm:h-[100px] h-[60px] border-r-2 birder-white flex   text-white'></div>

                <div className='flex justify-between  sm:gap-16 gap-4 items-center pl-4'>
                    <h1 className='sm:text-3xl text-2xl font-bold text-white'>250</h1>
                    <p className='font-semibold sm:text-md text-sm'>Type of <br /> Courses</p>
                </div>
            </div>

      </div>
    </div>
  )
}

export default Timeline
