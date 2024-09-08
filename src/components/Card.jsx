import { useState } from "react"
import Input from "./Input"
import Avatar from "./Avatar"


 function Card({src,name,latestMessage,isActive,onClick,aw,ah,isInput,email,scale, bg,isAdmin,sender,sentTime}) {
  console.log(sender)
    const [clicked,setClicked]=useState(false)
  return (
    <div className={`flex flex-row items-center gap-5 rounded-md cursor-pointer ${scale?` scale-${scale}`:``}
     p-4 ${isActive? `bg-blue-400`:`${isAdmin?`bg-warning`:`bg-slate-300`}`} transition-all ease-out 0.9s  `}
    // animate={{backgroundColor:clicked? 'rgb(15 23 42)' : 'rgb(203 213 225)' }}
     onClick={onClick}
     >

      <Avatar w={`${aw?aw:10}`} h={`${ah?ah:10}`} src={src}></Avatar>

      <div className='flex flex-col'>
        <div className=" text-lg font-semibold">
            {name}
        </div>
        {
          latestMessage?<div className=" flex flex-row justify-between gap-2 ">
            <span className="text-xl text-cyan-700">
              {sender}
            </span>
          <span className=" font-normal">
          {latestMessage}
          </span>
          <span className="font-thin text-blue-700">
            {sentTime}
          </span>
      </div>:<div className=" font-thin text-md">
           {email}
        </div>
        }
      </div>
      {
        isInput? <div className=" text-2xl">
         <Input type={`checkbox`}></Input>
        </div>:""
      }

    </div>
  )
}
export default Card