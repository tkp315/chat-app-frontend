import { MdOutlineCallEnd } from "react-icons/md";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { MdScreenShare } from "react-icons/md";
import React, { useRef } from 'react'

export default function VideoCalling() {
    const remoteVideoRef=useRef('');
    const localVideoRef=useRef('');

  return (
    <div className='flex flex-row justify-center items-center gap-7 min-h-screen '>
        
      <div className=' relative flex flex-col gap-3  bg-slate-100 w-[600px] p-4 shadow-md shadow-black rounded-md'>
       <div>
       <video ref={remoteVideoRef} className=' h-[400px]  border border-sky-200 rounded-md w-full'></video>
       </div>
       <div className='flex flex-row gap-3 justify-center'>
        <span>
          <button className=" p-4   hover:bg-blue-300 rounded-full bg-blue-400">
          <AiOutlineAudioMuted  className="text-xl text-black"></AiOutlineAudioMuted>
          </button>
        </span>
        <span>
        <button className=" p-4   hover:bg-yellow-300 rounded-full bg-yellow-400">
          <MdScreenShare className="text-xl"></MdScreenShare>
          </button>
        </span>
        <span>
        <button className=" p-4   hover:bg-red-300 rounded-full bg-red-500">
          <MdOutlineCallEnd className="text-xl"></MdOutlineCallEnd>
          </button>
        </span>
        

       </div>
        
      </div>

      <div className='w-[200px] p-2 absolute top-12  right-12 bg-slate-300 shadow-lg shadow-cyan-400 rounded-md '>
        <video ref={localVideoRef} className=' h-full border border-sky-200 rounded-md w-full' ></video>
       </div>
    </div>
  )
}
