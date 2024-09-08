import * as IoIcons from "react-icons/io"
import * as FaIcons from 'react-icons/fa'



 // eslint-disable-next-line react/prop-types
 function SideBarContent({htmlFor,content,text,btnType,isActive,onClick,cbs }) {
    const IconComp = IoIcons[content]
    const IconComp2 =FaIcons[content]
     
    function handlerFunction(){
        cbs();
    }

  return (
    <div 
     onClick={onClick}
    className={` flex flex-row gap-3 items-center ${isActive? `bg-slate-300`:``} `}>
      <label htmlFor={htmlFor}  className={` text-2xl btn   ${isActive?` link-primary `:`btn-${btnType}`}  $`}>
      {
       IconComp? <IconComp onClick={handlerFunction}></IconComp>:<IconComp2 onClick={handlerFunction} ></IconComp2>
      }
      </label>
      <div className={ ` cursor-pointer  font-semibold ${isActive? `text-blue-500`:``}`}>
        {text}
      </div>
    </div>
  )
}
export default SideBarContent