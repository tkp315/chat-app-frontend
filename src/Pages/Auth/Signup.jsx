import { useDispatch } from "react-redux"
import { singupData } from "../../assets/Data/authData"
import { FaUserCircle,FaCamera } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { signupThunk } from "../../Redux/Slices/userSlice"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Signup() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data,setData]=useState({
      fullName:"",
      password:"",
      confirmPassword:"",
      avatar:null,
      email:"",
      otp:""
    })

    function inputChangeHandler(e){
      const {name,value}= e.target;
      setData({...data,
         [name]:value
      })
      console.log("Group Name",e.target.value)
  }
  const[preview,setPreview]=useState("")
  function handleFile(e){
    e.preventDefault()
    const uploadedImage = e.target.files[0]
    console.log(e.target.files)
    console.log(uploadedImage);

    if(uploadedImage){
     setData({...data,avatar:uploadedImage})
    }
    const fileReader = new FileReader()
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load",function (){
        setPreview(this.result)
        console.log(this.result)
    })
 }
    
   async function handleSignup(e){
    e.preventDefault()
    const formData= new FormData();
    formData.append("fullName",data.fullName)
    formData.append("email",data.email)
    formData.append("otp",data.otp)
    formData.append("password",data.password)
    formData.append("confirmPassword",data.confirmPassword)
    formData.append("avatar",data.avatar)


    const res = await dispatch(signupThunk(formData));
    console.log(data)
    if(res.payload.statusCode===200){
        navigate("/login")
    }

}



  return (
    <div className="min-h-screen  flex flex-col justify-center items-center" >
      <div className="bg-white p-8 rounded-lg shadow-lg  w-[30%] ">
         <form 
         onSubmit={handleSignup}
         className="">
            <div className="flex flex-col gap-2 justify-center">
            <label htmlFor="avatar" className="relative">
                <FaUserCircle className=" w-full text-6xl text-center  cursor-pointer text-slate-400"></FaUserCircle>
                <FaCamera className=" absolute  bottom-0 right-[42%] cursor-default text-2xl text-blue-600"></FaCamera>
            </label>
            {
                preview?<img   className="w-12 h-12 rounded-full"  src={preview}></img>
                :   <input 
                onChange={handleFile}
                type="file" id="avatar" className=" hidden" name="avatar"></input>
               }
          
            </div>
           
             
          {singupData.map((e, idx) => {
            return (
            <div key={idx} className="flex flex-col gap-1">
                <label className="">
                    {e.label}
                </label>
                <input
                key={idx}
                onChange={inputChangeHandler}
                className="  w-auto p-2 outline-none border border-slate-500 rounded-md  placeholder:text-blue-900"
                type="text"
                name={e.name}
              ></input>
            </div>
            );
          })}

<div className="flex flex-row gap-1">
                <p className=" font-thin">
                                Already have an Account? 
                               </p>
                               <Link to="/login" className =" link-primary">
                               Login
                             </Link>
                            </div>
          <button className={` btn btn-primary`}>Signup</button>

          
         </form>
      </div>
     
    </div>
  )
}
