import React, { useState } from 'react'
import { BsFolder } from 'react-icons/bs'
import { CgNotes } from 'react-icons/cg'
import { BiTask } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import Tasks from '../pages/Tasks'

const RSidebar = () => {

  const [visible, setvisible] = useState(false);

  return (
    <div className='grid grid-cols-1 divide-y gap-4'>
      <div className='grid place-items-center'>
        <div className='mt-6'><BiTask onClick={()=>setvisible(!visible)} className='cursor-pointer rounded-full p-2 h-8 w-8 bg-blue-500 text-white'/></div>
        <div className='font-semibold text-md  p-2'>Tasks</div>
      </div>
      <div className='grid place-items-center'>
        <div className='mt-6'><CgNotes className='rounded-full p-2 h-8 w-8 bg-orange-500 text-white'/></div>
        <div className='font-semibold text-md p-2'>Notes</div>
      </div>
      <div className='grid place-items-center '>
        <div className='mt-6'><BsFolder className='rounded-full p-2 h-8 w-8 bg-[#B3E820] text-white'/></div>
        <div className='font-semibold text-md p-2'>Folders</div>
      </div>
      <div className='grid place-items-center '>
        <div className='mt-6'><AiOutlinePlus className='rounded-full p-2 h-8 w-8 text-gray-400'/></div>
      </div>
      <Tasks func={setvisible} visible={visible}/>
    </div>
  )
}

export default RSidebar
