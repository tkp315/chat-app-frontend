import React, { useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { modalActivation } from '../../Redux/Slices/modalSlice';
import { makingFriendThunk } from '../../Redux/Slices/userSlice';


export default function AddNewContact() {
    const dispatch =useDispatch();
    const[email,setEmail]=useState("");
   async function handleSubmit(){
        const res = await dispatch(makingFriendThunk({email:email}))
       
        if(res.payload.statusCode===200){
            console.log(res);
            dispatch(modalActivation({index:""}))
        }
    }
  return (
    
    <div className='w-96 p-8 h-fit  rounded-md  bg-blue-500 shadow-xl absolute top-44'>
    <div className=' flex flex-row gap-7 items-center'>
        <div >
            <button 
            onClick={()=>dispatch(modalActivation({index:''}))}
            className='btn btn-error'>
            <IoIosCloseCircle className='text-xl'></IoIosCloseCircle>
            </button>
        </div>
        <div className='text-center text-2xl font-bold' >
            New Friend
        </div>
    </div>
 <div className='flex flex-col gap-9'>
 <div className='flex flex-col gap-1'>
  <label className=' text-xl font-semibold' htmlFor='email'>Email</label>
<input
onChange={(e)=>setEmail(e.target.value)}
className=' w-full p-3 focus:outline-none focus:outline-cyan-400'
  type='email'
  ></input>
  </div>
  <button 
  onClick={handleSubmit}
  className='btn btn-primary'>Save</button>
 </div>

    </div>
  )
}
