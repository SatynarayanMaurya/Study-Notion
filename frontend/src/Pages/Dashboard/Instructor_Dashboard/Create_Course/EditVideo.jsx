import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { RxCross1 } from "react-icons/rx";






function EditVideo({closeAddLecture ,handleCreateSubSectionData}) {


  const { register, handleSubmit, formState: { errors } } = useForm();

  const [videoFileChange, setVideoFileChange] = useState("");

  const videoHandleChange = (e)=>{
    const file = e.target.files[0]
    if(file){

      setVideoFileChange(file)
    }
  }

  const onsubmit= (data)=>{
    data.videoUrl = videoFileChange
    handleCreateSubSectionData(data)
    closeAddLecture()
  }

  return (
    <div>
       
       <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-70  rounded-2xl'>
          <div className='bg-[#1e2533] w-[500px] h-[450px] rounded-2xl' >
                                    
              <div className='bg-[#353e4f] flex justify-between px-6  items-center py-2 rounded-lg'>
                  <p className='font-semibold text-lg '>Editing Lecture</p>
                  <p onClick={()=>closeAddLecture()} className='text-xl font-bold cursor-pointer'><RxCross1/></p>
              </div>

                <form action="" onSubmit={handleSubmit(onsubmit)}>
                    <div className='p-6 flex flex-col gap-4'>
                          
                          <div className='flex flex-col gap-2 '>
                              <label>Lecture Video<span className='text-red-600'>*</span> </label>
                              <div id='courseThumbnail' className="flex gap-6 items-center justify-center bg-[#3e4756] rounded-lg h-[80px]">

                                  <input id="file-upload" type="file" className="hidden" onChange={videoHandleChange} />
                                  <label htmlFor="file-upload"  className="cursor-pointer px-4 py-2  text-white rounded-md shadow-sm bg-blue-700 focus:ring-blue-500">Upload Video</label>
                                  {videoFileChange.name  ? videoFileChange.name: ""}
                                </div>
                          </div>

                          <div className='flex flex-col gap-2 '>
                            <label htmlFor="title"className='ml-1' >Lecture Title<span className='text-red-500'>*</span> </label>
                            <input type="text" name='title' id='title' {...register("title",{required:true})} className='bg-[#3e4756] px-5 py-2 rounded-md text-[#b2b4b4] outline-none' placeholder='Enter Course Title' />
                            {errors.title && <p className='text-red-600'>Lecture title is important*</p>}
                          </div>

                          <div className='flex flex-col gap-2 '>
                            <label htmlFor="title"className='ml-1' >Lecture time Duration<span className='text-red-500'>*</span> </label>
                            <input type="text" name='title' id='title' {...register("timeDuration")} className='bg-[#3e4756] px-5 py-2 rounded-md text-[#b2b4b4] outline-none' placeholder='Enter Course Title' />
                          </div>

                          <div className='flex justify-end items-center gap-3 mt-4'>

                              <button onClick={closeAddLecture}  className='bg-[#3d424e] text-white px-4  py-2 rounded-lg font-semibold '>Cancel</button>
                              <button  type='submit' className='bg-yellow-400 font-semibold  px-4 py-2 rounded-lg text-black '>Save Edit</button>

                          </div>

                    </div>
                </form>
          </div>
        </div>                     
                            

    </div>
  )
}

export default EditVideo
