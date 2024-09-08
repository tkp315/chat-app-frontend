import * as MdIcons from 'react-icons/fa'
function DropDown({icon,arr,btn_color}) {
    const IconCompo = MdIcons[icon]
  return (
    <div>
      <div className="dropdown">
        <div tabIndex={0} role="button" className={`btn-${btn_color} btn m-1`}>
          <IconCompo ></IconCompo>
        </div>
        <ul
          tabIndex={0}
          className={` dropdown-content  bg-base-100 rounded-box z-[1] w-52 p-2 shadow gap-3w-fit `}
        >
         {
            arr.map((e,idx)=>{
                return (<li key={idx} className=' btn-ghost '>{e}</li>)
            })
         }
        </ul>
      </div>
    </div>
  );
}
export default DropDown