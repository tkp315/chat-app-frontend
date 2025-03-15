import React from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import { IoMdVideocam } from 'react-icons/io'
import { Link } from 'react-router-dom'


export default function Call() {
  return (
    <div className="flex gap-7">
    <div className="flex gap-1 px-3  items-center mr-3  bg-base-100 rounded-md">
       <div className='bg-slate-200 p-4 mr-1 rounded-md shadow-lg hover:bg-slate-300 cursor-pointer '>
       <FiPhoneCall className="text-xl" />
       </div>
       <Link to={`/video-call`}>
       <div className='bg-slate-200 ml-1 p-4 rounded-md shadow-lg hover:bg-slate-300 cursor-pointer'>
        <IoMdVideocam className="text-xl w-full" />
        </div>
       </Link>
    </div>
  
</div>
  )
}
