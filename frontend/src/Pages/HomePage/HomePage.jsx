import React, { useState } from 'react'
import video from "../../assets/Images/banner.mp4"
import { useNavigate } from 'react-router-dom'
import { GoArrowRight } from "react-icons/go";
import Textpart from './Textpart';
import CodingPart from './CodingPart';
import { MdOutlinePeopleAlt } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import Timeline from './Timeline';
import LearningLanguage from './LearningLanguage';
import instructor from "../../assets/Images/Instructor.png"
import Footer from './Footer';

function HomePage() {

    const navigate = useNavigate();
    const [card1 , setCard1] = useState(true);
    const [card2, setCard2] = useState(false);
    const [card3, setCard3] = useState(false);

    const card1Handler = ()=>{
        setCard1(true)
        setCard2(false);
        setCard3(false);
    }

    const card2Handler = ()=>{
        setCard1(false)
        setCard2(true);
        setCard3(false);
    }
    const card3Handler = ()=>{
        setCard1(false)
        setCard2(false);
        setCard3(true);
    }



  return (
    < >

    {/* section A  */}

    <div className='md:w-9/12 w-10/12 mx-auto md:mt-10 mt-4 flex flex-col gap-6'>
      
        {/* First div for the heading and button part */}
      <div className='flex flex-col gap-4 items-center'>
        
            <div onClick={()=>navigate("/login")} className='flex items-center bg-[#1d242e] px-6 py-2 gap-2 rounded-xl'>
                <button  className='bg-[#1d242e] text-white  rounded-md font-semibold '>Become an Instructor</button>
                <p className='text-xl'><GoArrowRight/></p>
            </div>
            <h1 className='md:text-4xl text-3xl font-bold text-center '>Empower Your Future <span className=' bg-gradient-to-r from-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent'> with Coding Skills</span> </h1>
            <p className='text-center md:px-8 px-2 text-[#737070]'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>

            <div className='flex md:gap-6 gap-4 justify-center mt-2'>
                <button onClick={()=>navigate("/login")} className='bg-[#ffd60a] text-black md:px-8 px-4 py-2 rounded-md font-semibold '>Learn More</button>
                <button onClick={()=>navigate("/login")} className='bg-[#1d242e] text-white md:px-8 px-4 py-2 rounded-md font-semibold '>Book a Demo</button>
            </div>
        
      </div>
      
        {/* Second part for the video part */}
      <div>
        <video src={video} autoPlay muted loop/>
      </div>
      
        {/* Third part for the coding part */}
      <div className='flex md:flex-row flex-col md:justify-between md:gap-0 gap-8 mt-4  md:items-center'>
            <div className='md:w-[52%]'>
                <Textpart 
                    heading1={"Unlock your "}   
                    highlightPart={"coding potential "}
                    heading2={"with our online courses."}
                    paragraph={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    btnText={"Try it Yourself"}
                />
            </div>
            <div><CodingPart text={`<<!DOCTYPE html>>\n<html>\n<head><title><Example</title>\n<linkrel="stylesheet"href="style.css">\n</head>\n <body>\n h1><a href="/">Header</a>\n /h1>\nnav><a href="one/">one</a>\n a><a href="three/">three</a>\n/nav>`} active={false}/></div>
      </div>
      
        {/* Fourth part also for the coding part */}
        <div className='flex md:flex-row flex-col md:justify-between md:gap-0 gap-8 md:mt-8  md:items-centerr'>
            <div><CodingPart text={`<<!DOCTYPE html>>\n<html>\n<head><title><Example</title>\n<linkrel="stylesheet"href="style.css">\n</head>\n <body>\n h1><a href="/">Header</a>\n /h1>\nnav><a href="one/">one</a>\n a><a href="three/">three</a>\n/nav>`} active={true}/></div>
            <div className='md:w-[52%]'>
                <Textpart 
                    heading1={"Start  "}   
                    highlightPart={"coding in seconds. "}
                    paragraph={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                    btnText={"Continue Lesson"}
                />
            </div>
      </div>

      {/* fifth part  */}
      <div className='flex justify-between gap-1  flex-col items-center mt-6 mb-6'>
        <h1 className='md:text-4xl text-2xl text-center font-semibold'>Unlock the <span className=' bg-gradient-to-r from-[#76dded]  to-[#39f424] bg-clip-text text-transparent'> Power of code</span></h1>
        <p className='text-[#92959c] text-[15px]'>Learn to build anything that you can imagine</p>
      </div>


    </div>

    {/* section B  */}

    <div className="bg-white text-black md:mt-36 mt-[630px]">
        
        {/* Background Image and white Background start  */}
        <div className="w-10/12 mx-auto homebg flex justify-center items-center relative">

            {/* Cards  */}
            <div className='absolute md:-top-28 -top-[630px] flex md:flex-row flex-col md:gap-20 gap-12'>

                {/* card 1  */}
                <div onClick={card1Handler} className={card1 ? " flex flex-col gap-4 px-4 py-4 bg-white w-[270px] z-10": "flex flex-col gap-4 px-4 py-4 bg-[#1d242e] w-[270px] z-10"  }>
                    <h1 className={!card1 ? "font-bold text-md text-white":"font-bold text-md text-black"}>Learn HTML</h1>
                    <p className='text-[14px] text-[#92959c]'>This course covers the basic concepts of html,including creating and structuring web pages, adding text, links images and more</p>
                    <div className='flex justify-between items-center mt-2 text-[#92959c]'>
                        <div className='flex gap-2 items-center'>
                            <p className='text-md'><MdOutlinePeopleAlt/></p>
                            <button>Beginner</button>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <p className='text-md'><SlPeople/></p>
                            <button>6 Lesson</button>
                        </div>
                    </div>
                </div>
                {card1 && <div className='w-[270px] absolute left-4 top-[15px] bg-yellow-300 h-[210px] '></div>}
               
                
                {/* Card 2 */}
                <div onClick={card2Handler} className={card2 ? "flex flex-col gap-4 px-4 py-4 bg-white w-[270px] z-10": " flex flex-col gap-4 px-4 py-4 bg-[#1d242e] w-[270px] z-10"}>
                    <h1 className={!card2 ? "font-bold text-md text-white":"font-bold text-md text-black"}>Learn CSS</h1>
                    <p className='text-[14px] text-[#92959c]'>This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques</p>
                    <div className='flex justify-between items-center mt-2  text-[#92959c]'>
                        <div className='flex gap-2 items-center'>
                            <p className='text-md'><MdOutlinePeopleAlt/></p>
                            <button>Beginner</button>
                        </div>

                        <div className='flex gap-2 items-center'>
                            <p className='text-md'><SlPeople/></p>
                            <button>6 Lesson</button>
                        </div>
                    </div>
                </div>
                {card2 && <div className='w-[270px] absolute md:left-[366px] md:top-3 left-4 top-[273px] bg-yellow-300 h-[210px] '></div>}

                
                {/* Card 3  */}
                <div onClick={card3Handler} className={card3 ? "flex flex-col gap-4 px-4 py-4 bg-white w-[270px] z-10": "flex flex-col gap-4 px-4 py-4 bg-[#1d242e] w-[270px] z-10"}>
                    <h1 className={!card3 ? "font-bold text-md text-white":"font-bold text-md text-black"}>Responsive Web design</h1>
                    <p className='text-[14px]  text-[#92959c]'>This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes</p>
                    <div className='flex justify-between items-center mt-2  text-[#92959c]'>
                        <div className='flex gap-2 items-center'>
                            <p className='text-md'><MdOutlinePeopleAlt/></p>
                            <button>Beginner</button>
                        </div>

                        <div className='flex gap-2 items-center '>
                            <p className='text-md'><SlPeople/></p>
                            <button>6 Lesson</button>
                        </div>
                    </div>
                </div>
                {card3 && <div className='w-[270px] absolute md:left-[717px] md:top-3 left-4 top-[530px] bg-yellow-300 h-[210px] '></div>}
                

            </div>

            {/* Background Image and Button part */}
            <div className='md:h-[400px] h-[300px]'></div>
            <div className='flex md:flex-row flex-col gap-6  md:mt-2 mt-20'>
                <div onClick={()=>navigate("/login")} className='flex items-center bg-[#ffd60a] px-6 py-2 gap-2 rounded-xl'>
                    <button  className=' text-black  rounded-md font-semibold '>Explore Full Catalog</button>
                    <p className='text-xl text-black'><GoArrowRight/></p>
                </div>
                <button onClick={()=>navigate("/login")} className='bg-[#1d242e] text-white px-8 py-2 rounded-md font-semibold '>Learn More</button>
            
            </div>

        </div>



        {/* Heading and paragraph  */}
        <div className='md:w-9/12 w-10/12 mx-auto flex md:flex-row flex-col md:text-start text-center md:gap-8 gap-4 md:mt-16 mt-6'>

            <div >
                <h1 className='text-3xl font-semibold '>
                    Get the skills you need for a 
                    <span className=' bg-gradient-to-r from-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent'> job that is in demand</span>
                </h1>
            </div>

            <div className='flex flex-col gap-10 md:items-start md:w-[55%]'>
                <p className='md:text-[1.125rem]  md:font-semibold leading-7 md:text-[#2C333F] text-[#888b90] '>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                <button onClick={()=>navigate("/login")} className='bg-[#ffd60a]  text-black px-8 py-2 rounded-md font-semibold '>Learn More</button>
            </div>

        </div>



        {/* Time line section here  */}
        <div className='md:w-9/12 w-10/12 mx-auto md:mt-24 mt-12'>
            
            <Timeline/>
        </div>

        {/* Learning language part  */}
        <div className='md:w-9/12 w-10/12 mx-auto mt-28'>
            <LearningLanguage/>
        </div>

    </div>


    {/* Section C  */}
    <div className='md:w-9/12 w-10/12 mx-auto  md:mt-20 mt-10'>
        <div className='flex md:flex-row flex-col justify-between items-center md:gap-0 gap-12'>
            <div>
                <img src={instructor} alt="" />
            </div>

            <div className='flex flex-col gap-4 md:w-[33%] '>
                <div className='flex flex-col gap-4 '>
                    <h1 className='md:text-4xl text-3xl font-semibold '>Become an <br /> <span className='bg-gradient-to-r from-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent'>Instructor</span></h1>
                    <p className='text-[#838894] text-xs'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                </div>

                <div onClick={()=>navigate("/login")} className='flex md:mt-6 mt-2 items-center justify-center bg-[#ffd60a] px-6 py-2 gap-2 rounded-md'>
                    <button  className=' text-black  rounded-md font-semibold  '>Start Teaching Today</button>
                    <p className='text-xl text-black'><GoArrowRight/></p>
                </div>
            </div>
        </div>
    </div>


    {/* Footer Part  */}
    <div className=' bg-[#161D29]  md:mt-24 mt-12'>
        <div className=' w-10/12 mx-auto pt-12'>
            <Footer/>
        </div>
        <p className='text-end w-full text-[#7f7f84] pr-12 pb-4'>Copyright © 2024 Satynarayan Maurya</p>
    </div>
  </>
  )
}

export default HomePage
