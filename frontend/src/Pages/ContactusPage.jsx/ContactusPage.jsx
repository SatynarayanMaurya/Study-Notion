import React from 'react'
import Footer from "../HomePage/Footer"
import { GoCommentDiscussion } from "react-icons/go";
import { IoMdCall } from "react-icons/io";
import { RiEarthFill } from "react-icons/ri";
import { RiFacebookCircleFill } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";
import { IoLogoYoutube } from "react-icons/io";
import { LuInstagram } from "react-icons/lu";
import { FaTwitter } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../Services/apiConnector';
import { contact_formEndpints } from '../../Services/apis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from 'react-redux'
import { setLoading } from '../../Redux/Slices/loginSlice';
import Spinner from '../../Components/Common/Spinner';
function ContactusPage() {

  const {register, handleSubmit,formState: { errors },reset} = useForm();
  const loading = useSelector((state)=>state.auth.loading)
  const dispatch = useDispatch()

  const onsubmit = async(data)=>{
    try{
      dispatch(setLoading(true))
      const response = await apiConnector("post", contact_formEndpints.CONTACT_FORM_API, data)
      dispatch(setLoading(false))
      toast.success(response.data.message)
      reset();

    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error.response.data.message)
      return;
    }
  }

  return (
    <div className='flex flex-col gap-12 '>

          { loading && <Spinner/>}

          {/* Upper part  */}
          <div className='lg:mx-48 mx-6 flex lg:flex-row flex-col lg:gap-0 gap-12  justify-between lg:mt-16 mt-6 '>

            {/* Left part / */}
              <div className='lg:w-[30%] flex flex-col lg:gap-8 gap-4'>

                <div className=' h-[320px] flex flex-col gap-6 pl-6 py-6 bg-[#161D29] rounded-lg'>
                      <div className='flex gap-5 items-center '>
                         <p className='text-2xl'><GoCommentDiscussion/></p>
                         <div className='flex flex-col'>
                          <p className='text-lg font-semibold'>Chat on us</p>
                          <div className='text-[14px] text-[#999DAA]'>
                              <p>Our friendly team is here to help.</p>
                              <p>@email address</p>
                          </div>
                         </div>
                      </div>

                      <div className='flex gap-5 items-center'>
                         <p className='text-2xl'><RiEarthFill/></p>
                         <div className='flex flex-col'>
                          <p className='text-lg font-semibold'>Visit us</p>
                          <div className='text-[14px] text-[#999DAA]'>
                              <p>Come and say hello at our office HQ.</p>
                              <p>Here is the location / address</p>
                          </div>
                         </div>
                      </div>

                      <div className='flex gap-5 items-center'>
                         <p className='text-2xl'><IoMdCall/></p>
                         <div className='flex flex-col'>
                          <p className='text-lg font-semibold'>Call us</p>
                          <div className='text-[14px] text-[#999DAA]'>
                              <p>Mon - Fri froom 8am to 5pm.</p>
                              <p>+123 4567890</p>
                          </div>
                         </div>
                      </div>
                </div>

                <div className='flex flex-col gap-3 pl-6 py-6 bg-[#161D29] rounded-lg '>
                    <h1 className='text-xl font-semibold'>Connect with us</h1>

                      <div className='flex flex-col gap-2 ml-5 '>

                          <div className='flex gap-2 items-center  cursor-pointer'>
                            <p className='text-xl'><RiFacebookCircleFill/></p>
                            <p className='-mt-[1px] text-[#b7bccc]'>Facebook</p>
                          </div>

                          <div className='flex gap-2 items-center  cursor-pointer'>
                            <p className='text-xl'><FaTwitter/></p>
                            <p className='-mt-[1px] text-[#b7bccc]'>Twitter</p>
                          </div>

                          <div className='flex gap-2 items-center  cursor-pointer'>
                            <p className='text-xl'><IoLogoYoutube/></p>
                            <p className='-mt-[1px] text-[#b7bccc]'>Youtube</p>
                          </div>

                          <div className='flex gap-2 items-center cursor-pointer'>
                            <p className='text-xl'><LuInstagram/></p>
                            <p className='-mt-[1px] text-[#b7bccc]'>Instragram</p>
                          </div>

                          <div className='flex gap-2 items-center  cursor-pointer'>
                            <p className='text-xl'><CiLinkedin/></p>
                            <p className='-mt-[1px] text-[#b7bccc]'>Linked in</p>
                          </div>

                      </div>
                </div>

                </div>


                {/* Right part  */}
                <div className='lg:w-[60%] border-2 border-[#424854] rounded-2xl py-6 px-4 lg:p-10 flex flex-col gap-6'>
                    
                    <div className='flex flex-col gap-2'>
                        <div className='lg:text-3xl text-2xl font-semibold flex flex-col '>
                            <h1>Got a idea ? We've got the skills.</h1>
                            <h1 className='lg:block hidden'>Let's Team up</h1>
                        </div>
                        <p className='text-[14px] text-[#999DAA]'>Tell me about more yourself and what you're got in mind.</p>
                    </div>
                    
                    <div>

                        <form action="" onSubmit={handleSubmit(onsubmit)} className=' flex flex-col gap-4 lg:mr-12'>

                            <div className='flex flex-col gap-1'>
                              <label htmlFor="firstName" className='ml-1'>First Name<span className='text-red-500'>*</span></label>
                              <input type="text" name='firstName' id='firstName' {...register("firstName", {required:true})} placeholder='Enter your first Name...' className='px-6 py-2 rounded-lg bg-[#1c2432] text-[#999DAA] outline-none' />
                              {errors.firstName && <p className='text-red-600'>first name is important!</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                              <label htmlFor="lastName" className='ml-1'>Last Name<span className='text-red-500'>*</span></label>
                              <input type="text" name='lastName' id='lastName' {...register("lastName")} placeholder='Enter your last Name...' className='px-6 py-2 rounded-lg bg-[#1c2432] text-[#999DAA] outline-none' />
                            </div>

                            <div className='flex flex-col gap-1'>
                              <label htmlFor="email" className='ml-1'>Email<span className='text-red-500'>*</span></label>
                              <input type="text" name='email' id='email' {...register("email", {required:true})} placeholder='Enter your last Name...' className='px-6 py-2 rounded-lg bg-[#1c2432] text-[#999DAA] outline-none' />
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
                              <textarea name="message" id="message" placeholder='Enter message...' {...register("message",{required:true})}  className='px-4 py-2 rounded-lg bg-[#1c2432] text-[#999DAA] outline-none' rows={4} cols={75}></textarea>
                              {errors.message && <p className='text-red-600'>Message is important!</p>}
                            </div>

                            <button type='submit' className='bg-yellow-400 text-black py-2 font-semibold rounded-full mt-4'>Send Message</button>


                        </form>
                    </div>
                </div>

          </div>

          {/* Down part  */}
          <div className='lg:mt-16  px-6 lg:mx-0 mx-auto bg-[#161D29] lg:p-16 py-8'>
            <Footer/>
          </div>
    </div>
  )
}

export default ContactusPage
