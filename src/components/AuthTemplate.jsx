import React, { useState } from "react";
import Input from "./Input";
import { FaCamera, FaPen, FaUser, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";



function AuthTemplate({ arr, isAvatar, btnTyp, btnContent, formName, submitHandler,extra}) {
  const [avatar,setavatar]=useState(null);


const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
   
    
    const data = Object.fromEntries(formData);
    console.log('Form Data:', data);

  
    console.log('Form Data with File:', data);
    submitHandler(data); // Submit data with file included
};

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg  w-[30%] ">
        <form 
        onSubmit={handleSubmit}
        >
        <div className=" flex flex-col gap-2">
          <h1 className=" text-2xl font-semibold mb-2">{formName}</h1>
          
          {
            isAvatar?
            <div className="flex flex-col gap-2 justify-center">
            <label htmlFor="avatar" className="relative">
                <FaUserCircle className=" w-full text-6xl text-center  cursor-pointer text-slate-400"></FaUserCircle>
                <FaCamera className=" absolute  bottom-0 right-[42%] cursor-default text-2xl text-blue-600"></FaCamera>
            </label>

            <input 
            onChange={handleFile}
            type="file" id="avatar" className=" hidden" name="avatar"></input>
            </div>:""
          }

         
          {arr.map((e, idx) => {
            return (
            <div key={idx} className="flex flex-col gap-1">
                <label className="">
                    {e.label}
                </label>
                <input
                key={idx}
                className="  w-auto p-2 outline-none border border-slate-500 rounded-md  placeholder:text-blue-900"
                type="text"
                name={e.name}
              ></input>
            </div>
            );
          })}
          
          {
            extra? (isAvatar?
                <div className="flex flex-row gap-1">
                <p className=" font-thin">
                                Already have an Account? 
                               </p>
                               <Link to="/login" className =" link-primary">
                               Login
                             </Link>
                            </div>
            :(
                <div className=" flex flex-col gap-2">
            <div className="flex flex-row gap-1">
<p className=" font-thin">
                Don't have account
               </p>
               <Link to="/send-otp" className =" link-primary">
               Signup
             </Link>
             
            </div>

            <div className="flex flex-row gap-1">
<p className=" font-thin">
               Forget Password?
               </p>
               <Link to="/send-reset-token" className =" link-primary">
               Reset Password
             </Link>
             
            </div>
            </div>
               )):""
          }


          <button className={` btn btn-${btnTyp}`}>{btnContent}</button>
        </div>
        </form>
      </div>
    </div>
  );
}
export default AuthTemplate;
