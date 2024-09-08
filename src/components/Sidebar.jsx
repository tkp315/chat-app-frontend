import React, { useRef, useState } from 'react'
import {motion} from 'framer-motion'
import SideBarContent from './SideBarContent'
import { ActiveTab } from '../assets/Functions/active'
import { sidebar } from '../assets/Data/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { logoutThunk } from '../Redux/Slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { sidebarActivation } from '../Redux/Slices/modalSlice'
 function Sidebar() {
    const ref = useRef(null)
    const [open,setOpen]=useState(false)
    const [activeSideIndex,setActiveSideIndex]=useState(false)


    function handleWidth(){
        console.log(ref.current)
        setOpen(!open)
        open?ref.current.style.width="fit-content":ref.current.style.width="250px"
        
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function logoutFunction(){
      const res = await dispatch(logoutThunk());
      if(res.payload.statusCode===200){
       navigate("/")   
      }
    }
    
    function toActive(index){
      const res = dispatch(sidebarActivation({activeIndex:index}))
      console.log(res);
    }
  return (
    <div className='flex flex-col gap-2 shadow-xl bg-white w-fit h-[89.5vh]'>
     <motion.div className={`drawer min-h-full border-r-2 border-blue-500`}
      animate={{ width: open ? '200px' : '64px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      ref={ref}  >
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">


    {/* Page content here */}
    <div className={`flex flex-col gap-2  ${open?`overflow-x-visible`:`overflow-x-hidden`}`}>
     <div onClick={handleWidth}>
     <SideBarContent htmlFor="my-drawer" content={`IoMdMenu`} btnType={`primary`}
     ></SideBarContent>
     </div>
     {
      sidebar.map((e,idx)=>{
        return (<div key={e.id} onClick={()=>ActiveTab(e.id,activeSideIndex,setActiveSideIndex,toActive)} >
          <SideBarContent  isActive={activeSideIndex===e.id} content={e.icon} text={e.text} ></SideBarContent>
        </div>)
      })
     }
    
     <div className=' mt-2 border-t-2 border-b-amber-400'></div>

     <div className=' mt-2 '
      
     >
      <SideBarContent 
      cbs={logoutFunction}
      content={`IoMdLogOut`} text={`Logout`} btnType={"warning"}></SideBarContent>
     </div>
     </div>
  </div>
 
</motion.div>
    </div>
  )
}
export default Sidebar