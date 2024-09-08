import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import {IoIosNotifications} from 'react-icons/io'
import Sidebar from "./Sidebar"
import { useSelector } from "react-redux"


 function Header({children}) {
  const user = useSelector((state)=>state.user);
  const avatar = user.userData.avatar;
  console.log(avatar)
  
  return (
    <div className=" fixed w-full">
    <div className=" flex flex-col ">
    <div className=" bg-white w-full flex flex-row shadow-lg justify-between px-3 py-1 text-black items-center  border-b-2 border-blue-500">
      <div className=" text-black font-semibold text-xl  ">
        
       <Link className=" hover:text-blue-500" >
       CHAT-APP</Link>
      </div>
      <div>
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
        <Avatar w="10" h="10" src={avatar}></Avatar>
        </div>
        <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
      
          </a>
        </li>
  
   
      </ul>
        </div>
      </div>

    </div>
     
        <div className=" flex flex-row ">
        <Sidebar></Sidebar>
        <div className="flex-grow">{children}</div>
        </div>
    </div>
    {children}
    </div>
  )
}
export default Header