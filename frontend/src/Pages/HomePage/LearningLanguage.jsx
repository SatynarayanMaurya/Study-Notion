import React from 'react'
import { useNavigate } from 'react-router-dom'
import knowYourProgress from "../../assets/Images/Know_your_progress.png"
import planYourLessons from "../../assets/Images/Plan_your_lessons.png"
import compareWithOthers from "../../assets/Images/Compare_with_others.png"
function LearningLanguage() {

    const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 pb-10">

      <div className='flex flex-col items-center gap-2 '>
            <h1 className='sm:text-[2rem] text-[1.75rem]  font-bold text-center'>Your swiss knife for <span className='bg-gradient-to-r from-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent'>learning any language</span></h1>
            <p className='text-center text-[1.025rem] sm:font-semibold leading-7 sm:text-[#2C333F] text-[#888b90]  sm:w-9/12 '>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom  schedule and more.</p>
      </div>

        {/* image section  */}
      <div className='flex sm:flex-row flex-col gap-0 items-center '>
            <div>
                <img src={knowYourProgress} alt="" />
            </div>

            <div>
                <img src={compareWithOthers} alt="" />
            </div>

            <div>
                <img src={planYourLessons} alt="" />
            </div>
      </div>

      <div className='flex justify-center'>
        <button onClick={()=>navigate("/login")} className='bg-[#ffd60a] text-black px-8 py-2 rounded-lg font-semibold '>Learn More</button>
      </div>
    </div>
  )
}

export default LearningLanguage
