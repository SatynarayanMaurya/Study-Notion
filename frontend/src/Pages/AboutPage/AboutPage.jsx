import React from 'react'
import Footer from '../HomePage/Footer'
import img1 from "../../assets/Images/aboutus1.webp"
import img2 from "../../assets/Images/aboutus2.webp"
import img3 from "../../assets/Images/aboutus3.webp"
import foundingStoryImage from "../../assets/Images/FoundingStory.png"
import { useForm } from 'react-hook-form'
import {apiConnector} from "../../Services/apiConnector"
import { contact_formEndpints } from '../../Services/apis';
import { toast } from 'react-toastify'

function AboutPage() {

  const {register, handleSubmit,formState: { errors },reset} = useForm();

  
  const onsubmit = async(data)=>{
    try{
      const response = await apiConnector("post", contact_formEndpints.CONTACT_FORM_API,data);
      toast.success(response.data.message)
      reset();

    }
    catch(error){
      toast.error(error.response.data.message)
      return;
    }
  }

  return (
    <div className='flex flex-col gap-6 overflow-x-hidden'>

        {/* First section  */}
        <section className='bg-[#161D29] lg:pt-12 pt-6 lg:h-[470px] mb-[280px]'>

          <div className='lg:w-9/12 w-10/12 mx-auto flex flex-col gap-6'>

              {/* heading and paragraph part  */}
            <div className='mx-auto lg:w-8/12 text-center flex flex-col gap-4'>

                <h1 className='lg:text-[32px] text-2xl font-bold'>Driving Innovation in Online Education for a <span className='bg-gradient-to-r from-[#12d8fa] to-[#a6ffcb] bg-clip-text text-transparent'>Brighter Future</span></h1>

                <p className='text-[#838894] lg:text-[16px] text-[14px]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

            </div>

              {/* image part  */}
            <div className='flex lg:flex-row flex-col gap-6 '>
                <img src={img1} alt="aboutus" />
                <img src={img2} alt="aboutus" />
                <img src={img3} alt="aboutus" />
            </div>

            <div className='mt-2 lg:w-10/12 mx-auto lg:mb-0 mb-10'>
                <p className='text-[#AFB2BF] font-semibold lg:text-3xl text-[20px] text-center'>We are passionate about revolutionizing the way we learn. Our innovative platform <span className='bg-gradient-to-r from-[#1Fa2ff] to-[#a6ffcb] bg-clip-text text-transparent'>combines technology</span>, <span className='bg-gradient-to-r from-[#ff512f] to-[#f09819] bg-clip-text text-transparent'>expertise</span>, and community to create an <span className='bg-gradient-to-r from-[#e65c00] to-[#f9d423] bg-clip-text text-transparent'>unparalleled educational experience.</span></p>
            </div>

          </div>

        </section>

        <div className='border border-[#2C333F] lg:mt-0 -mt-[305px]'></div>

        {/* Second foundation section  */}
        <section className='lg:w-9/12 w-10/12 mx-auto flex flex-col gap-12  lg:mt-8 '>
                
                  {/* Upper part  */}
                <div className='flex lg:flex-row flex-col lg:gap-0 gap-8 justify-between items-center'>
                  <div className='lg:w-[40%] flex flex-col gap-3  '>
                      <h1  className='bg-gradient-to-r from-[#ff55c6] to-[#ff1111] bg-clip-text text-transparent lg:text-4xl text-3xl pb-1 font-semibold'>Our Founding Story </h1>
                      <div className='lg:text-[16px] text-[14px] text-[#838894] flex flex-col gap-3'>
                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                      </div>
                  </div>

                  <div>
                      <img src={foundingStoryImage} alt="foundingStory" />
                  </div>

                </div>

                {/* Down part  */}
                <div className='flex lg:flex-row lg:gap-0 gap-8 flex-col justify-between items-center lg:mt-8'>

                  <div className='lg:w-[40%] flex flex-col gap-2'>
                      <h1  className='bg-gradient-to-r from-[#e65c00] to-[#f9d423] bg-clip-text text-transparent lg:text-4xl text-3xl pb-1 font-semibold'>Our Vision </h1>
                      <div className='text-[16px] text-[#838894]'>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                      </div>
                  </div>

                  <div className='lg:w-[40%] flex flex-col gap-2'>
                      <h1  className='bg-gradient-to-r from-[#1fa2ff] to-[#a6ffcb] bg-clip-text text-transparent  lg:text-4xl text-3xl pb-1 font-semibold'>Our Mission</h1>
                      <div className='text-[16px] text-[#838894] '>
                        <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                      </div>
                  </div>

                </div>

        </section>

        {/* Third section  Active student*/}
        <section className='bg-[#161D29] mt-10'>

              <div className='lg:w-9/12 w-10/12 mx-auto flex-wrap flex lg:gap-44 gap-24 lg:px-36 lg:py-20 py-10 '>

                  <div className='flex flex-col gap-1 text-center'>
                    <p className='text-3xl font-semibold'>5K</p>
                    <p className='text-[#585D69]'>Active Student</p>
                  </div>

                  <div className='flex flex-col gap-1 text-center'>
                    <p className='text-3xl font-semibold'>10+</p>
                    <p className='text-[#585D69]'>Mentors</p>
                  </div>

                  <div className='flex lg:ml-0 ml-6 flex-col gap-1 text-center'>
                    <p className='text-3xl font-semibold'>200+</p>
                    <p className='text-[#585D69]'>Courses</p>
                  </div>

                  <div className='flex flex-col gap-1 text-center'>
                    <p className='text-3xl font-semibold'>50+</p>
                    <p className='text-[#585D69]'>Awards</p>
                  </div>

              </div>

        </section>

        {/* Four section Box section  */}
        <section className='lg:w-9/12 w-10/12 mx-auto flex flex-col gap-1 lg:mt-12'>

            {/* Top grid  */}
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-1">

            <div className=" lg:col-span-2 p-4 flex flex-col gap-4 items-start">
              
              <h1 className='lg:text-4xl text-3xl font-semibold'>World-Class Learning for <span className='bg-gradient-to-r from-[#1fa2ff] to-[#4def93] bg-clip-text text-transparent'>Anyone, Anywhere</span></h1>
              <p className='text-[#838894] lg:text-[16px] text-[14px]'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
              <button className='px-4 py-2 rounded-lg font-semibold bg-yellow-400 text-black'>Learn More</button>

            </div>

            <div className="bg-[#2C333F] py-8 px-10 flex flex-col gap-6 h-[256px]">

              <h1 className='text-xl font-semibold'>Curriculum Based on Industry Needs</h1>
              <p className='text-[#AFB2BF] text-[14px]'>Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.</p>

            </div>

            <div className="bg-[#161D29] py-8 px-10 flex flex-col gap-6 lg:h-[256px]">

              <h1 className='text-xl font-semibold'>Our Learning Methods</h1>
              <p className='text-[#AFB2BF] text-[14px]'>The learning process uses the namely online and offline.</p>

            </div>

          </div>

            {/* Bottom grid  */}
          <div className="grid lg:grid-cols-4 gap-1">
            <div></div>
              
            <div className="bg-[#2C333F] pt-8 pb-8 px-10 flex flex-col gap-[42px]">

              <h1 className='text-xl font-semibold'>Certification</h1>
              <p className='text-[#AFB2BF] text-[14px]'>You will get a certificate that can be used as a certification during job hunting.</p>

            </div>
              
            <div className="bg-[#161D29] pt-6 pb-8 px-10 flex flex-col gap-6">

              <h1 className='text-xl font-semibold'>Rating "Auto-grading"</h1>
              <p className='text-[#AFB2BF] text-[14px]'>You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.</p>

            </div>
              
            <div className="bg-[#2C333F] pt-6 pb-8 px-10 flex flex-col gap-5">

              <h1 className='text-xl font-semibold'>Ready to <br /> work</h1>
              <p className='text-[#AFB2BF] text-[14px]'>Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.</p>

            </div>

          </div>

        </section>

        {/* Five section form  */}
        <section className='lg:w-9/12 w-10/12 mx-auto lg:mt-24 mt-4 flex flex-col lg:gap-10 gap-6 items-center'>

              <div className='flex flex-col gap-1 items-center'>
                <h1 className='text-3xl font-semibold'>Get in Touch</h1>
                <p className='text-[#838894] lg:text-[16px] text-[14px] text-center'>We'd love to here for you, Please fill out this form.</p>
              </div>

              <div className='lg:w-[35%] w-full mx-auto'>

                <form action="" onSubmit={handleSubmit(onsubmit)} className=' flex flex-col gap-4 '>

                  <div className='flex flex-col gap-1'>
                    <label htmlFor="firstName" className='ml-1'>First Name<span className='text-red-500'>*</span></label>
                    <input type="text" name='firstName' id='firstName' {...register("firstName", {required:true})} placeholder='Enter your first Name...' className='lg:px-6 px-4 py-2 rounded-lg bg-[#1c2432] text-[#999DAA] outline-none' />
                    {errors.firstName && <p className='text-red-600'>first name is important!</p>}
                  </div>

                  <div className='flex flex-col gap-1'>
                    <label htmlFor="lastName" className='ml-1'>Last Name<span className='text-red-500'>*</span></label>
                    <input type="text" name='lastName' id='lastName' {...register("lastName")} placeholder='Enter your last Name...' className='lg:px-6 px-4 py-2 rounded-lg bg-[#1c2432] text-[#999DAA] outline-none' />
                  </div>

                  <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='ml-1'>Email<span className='text-red-500'>*</span></label>
                    <input type="text" name='email' id='email' {...register("email", {required:true})} placeholder='Enter your last Name...' className='lg:px-6 px-4  py-2 rounded-lg bg-[#1c2432] text-[#999DAA] outline-none' />
                    {errors.email && <p className='text-red-600'>Email is important!</p>}
                  </div>

                  <div className='flex flex-col gap-1'>
                    <label htmlFor="phoneNumber">Phone Number<span className='text-red-500'>*</span></label>
                    <div className='flex gap-3'>
                      <p className='rounded-lg px-4 py-2 bg-[#1c2432]'>+91</p>
                      <input type="text" id='phoneNumber' name='phoneNumber' {...register("phoneNumber", {required:true})} placeholder='Enter phone number...' className='px-3 py-2 rounded-lg bg-[#1c2432] w-full text-[#999DAA] outline-none' />
                    </div>
                      {errors.phoneNumber && <p className='text-red-600 ml-20'>phone number is important!</p>}
                  </div>

                  <div  className='flex flex-col gap-1'>
                    <label htmlFor="message">Message<span className='text-red-500'>*</span></label>
                    <textarea name="message" id="message" placeholder='Enter message...' {...register("message",{required:true})}  className=' px-4  py-2 rounded-lg bg-[#1c2432] text-[#999DAA] outline-none' rows={4} cols={75}></textarea>
                    {errors.message && <p className='text-red-600'>Message is important!</p>}
                  </div>

                  <button type='submit' className='bg-yellow-400 text-black py-2 font-semibold rounded-full mt-4'>Send Message</button>


                </form>

              </div>

        </section>

        {/* Six section  */}
        <section className='lg:mt-16  px-6 lg:mx-0 mx-auto bg-[#161D29] lg:p-16 py-8'>
            <Footer/>
        </section>

    </div>
  )
}

export default AboutPage
