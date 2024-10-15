import React from 'react'
import studyNotion from "../../assets/Logo/Logo-Full-Light.png"
import { useNavigate } from 'react-router-dom'

import { FooterLink2 } from '../../data/footer-links';
function Footer() {
    const navigate = useNavigate(); 


  return (
    <div className='flex sm:justify-between  sm:flex-row flex-col sm:gap-0 gap-12  text-[14px] text-[#818491] pb-8'>
        {/* Left Part  */}
      <div className='flex sm:gap-24 gap-8 justify-between sm:px-0 px-2 '>
        
            <div className='flex flex-col gap-4'>
                <img src={studyNotion} alt=""  />
                <div className='flex flex-col gap-3'>

                   <h1 className='text-[#C5C7D4] text-[17px] font-semibold'>Company</h1>
                    <div className='flex flex-col gap-3 items-start'>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>About</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Carriers</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Affiliates</button>
                    </div>

                </div>
            </div>

            <div className='flex flex-col  gap-4'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-[#C5C7D4] text-[17px] font-semibold'>Resources</h1>
                    <div className='flex flex-col gap-3 items-start'>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Article</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Blog</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Chart Sheet</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>challenges</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Chart Sheet</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200 sm:block hidden'>Docs</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Projects</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200 sm:block hidden'>Videos</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200 sm:block hidden'>Workspaces</button>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <h1 className='text-[#C5C7D4] text-[17px] font-semibold'>Support</h1>
                    <div className='flex flex-col gap-2 items-start'>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Help Center</button>
                    </div>
                </div>
            </div>


            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-[#C5C7D4] text-[17px] font-semibold'>Plans</h1>
                    <div className='flex flex-col gap-3 items-start'>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Memberships</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>For students</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Business</button>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <h1 className='text-[#C5C7D4] text-[17px] font-semibold'>Community</h1>
                    <div className='flex flex-col gap-3 items-start'>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Forums</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Chapters</button>
                        <button onClick={()=>navigate("/about")} className='hover:text-[#c5c7d4] transition-all duration-200'>Events</button>
                    </div>
                </div>
            </div>
                    

      </div>

        
      {/* Right Part  */}
      <div className='flex  sm:gap-24 justify-between '>
        <div className='h-[600px] sm:block hidden border-r border-[#818491] '></div>
        {
            FooterLink2.map((footer,index)=>{
                return <div key={index}>
                            {
                                index === 2 ? (<div className='sm:block hidden'><h1 className='text-[#C5C7D4] text-[17px] font-semibold mb-4'>{footer.title}</h1>
                                    <div className='flex flex-col gap-3 items-start'>
                                        {
                                            footer.links.map((linkk,index)=>{
                                                return <div key={index} >
                                                            <button onClick={()=>navigate(linkk.link)}>{linkk.title}</button>
                                                        </div>
                                            })
                                        }
                                    </div></div>):(<><h1 className='text-[#C5C7D4] text-[17px] font-semibold mb-4'>{footer.title}</h1>
                                    <div className='flex flex-col gap-3 items-start'>
                                        {
                                            footer.links.map((linkk,index)=>{
                                                return <div key={index} >
                                                            <button onClick={()=>navigate(linkk.link)}>{linkk.title}</button>
                                                        </div>
                                            })
                                        }
                                    </div></>)
                            }
                        </div>
            })
        }
      </div>
    </div>
  )
}

export default Footer
