import React from 'react'

 function Input({type,val,name,cb,place,bgcolor}) {
  
  return (
    <div >
        <input className={` w-auto p-2 outline-none border border-slate-500 rounded-md  placeholder:text-blue-900 bg-${bgcolor} `} type={type}  placeholder={place} ></input>
    </div>
  )
}
export default Input