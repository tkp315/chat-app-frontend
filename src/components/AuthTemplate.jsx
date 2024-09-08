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
    <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">{formName}</h1>
          
          {isAvatar ? (
            <div className="flex flex-col items-center gap-4">
              <label htmlFor="avatar" className="relative">
                <FaUserCircle className="w-20 h-20 sm:w-24 sm:h-24 text-slate-400 cursor-pointer" />
                <FaCamera className="absolute bottom-0 right-6 sm:right-8 text-2xl text-blue-600" />
              </label>
              <input
                // onChange={handleFile}
                type="file"
                id="avatar"
                className="hidden"
                name="avatar"
              />
            </div>
          ) : null}
  
          {arr.map((e, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <label className="text-sm sm:text-base">{e.label}</label>
              <input
                key={idx}
                className="w-full p-2 sm:p-3 border border-slate-500 rounded-md placeholder:text-blue-900 outline-none"
                type="text"
                name={e.name}
              />
            </div>
          ))}
  
          {extra ? (
            isAvatar ? (
              <div className="flex flex-row gap-1 text-sm sm:text-base">
                <p className="font-thin">Already have an account?</p>
                <Link to="/login" className="link-primary">
                  Login
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-1 text-sm sm:text-base">
                  <p className="font-thin">Don't have an account?</p>
                  <Link to="/send-otp" className="link-primary">
                    Signup
                  </Link>
                </div>
                <div className="flex flex-row gap-1 text-sm sm:text-base">
                  <p className="font-thin">Forgot Password?</p>
                  <Link to="/send-reset-token" className="link-primary">
                    Reset Password
                  </Link>
                </div>
              </div>
            )
          ) : null}
  
          <button className={`btn btn-${btnTyp} w-full sm:w-auto`}>
            {btnContent}
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
}
export default AuthTemplate;
