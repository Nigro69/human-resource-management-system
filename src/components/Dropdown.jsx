import React, { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'

const Dropdown = ({name,list,set}) => {
    const [drop, setdrop] = useState(false)

    const clicked=(index)=>{
      set(index);
      setdrop(false);
    }

  return (
    <div>
    <div className='cursor-pointer rounded-md border px-2 py-1 text-md tracking-wider text-gray-500 flex place-items-center gap-3 relative' onClick={()=>setdrop(!drop)}>
        <div>
        {name}
        </div>
        <div>
        <BsChevronDown/>
        </div>
    </div>
    {drop && <div className='absolute rounded-md bg-white shadow-lg grid grid-cols-1 divide-y'>
        {list.map((item,index)=>(
        <div onClick={()=>clicked(index)} className='text-sm font-semibold text-gray-700 cursor-pointer text-center px-6 py-2 hover:bg-gray-100'>{item}</div>
        ))}
    </div>}
    </div>
  )
}

export default Dropdown