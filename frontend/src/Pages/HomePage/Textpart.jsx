import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GoArrowRight } from "react-icons/go";


function Textpart({heading1, highlightPart, heading2, paragraph, btnText}) {


    const navigate = useNavigate();
  return (
    <div className='flex flex-col lg:gap-8 gap-4 '>

      <h1 className='sm:text-4xl text-3xl  font-bold lg:text-start text-center'>{heading1} <span className='text-[#12d8fa]'>{highlightPart}</span> {heading2}</h1>

      <p className='text-[#838894] sm:text-[1.125rem] sm:text-start text-center'>{paragraph}</p>

      <div className='flex sm:gap-6 gap-3  mt-2'>
            <div onClick={()=>navigate("/login")} className='flex items-center bg-[#ffd60a] sm:px-8 px-3 py-2 gap-2  rounded-xl'>
                <button  className=' text-black  rounded-lg font-semibold '>{btnText}</button>
                <p className='text-xl text-black'><GoArrowRight/></p>
            </div>
            <button onClick={()=>navigate("/login")} className='bg-[#1d242e] text-white sm:px-8 px-4 py-2 rounded-lg font-semibold '>Learn More</button>
      </div>
    </div>
  )
}

export default Textpart
