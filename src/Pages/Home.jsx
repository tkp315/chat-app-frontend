import { IoIosLogIn } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../Redux/Slices/userSlice";




const Home = () => {
    const user = useSelector((state)=>state.user)
    console.log(user)
    const isLoggedIn = user.isLoggedIn;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler =async ()=>{
     const res = await dispatch(logoutThunk());
     if(res.payload.statusCode===200)navigate("/")
    }
      //  instance of socket

     
 
   
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to ChatApp</h1>
        <p className="text-gray-600 mb-6">Connect with your friends and family, anytime, anywhere.</p>

      {isLoggedIn?
      <div className="flex justify-center space-x-4">
      <Link 
    
      to="/chats" className="btn btn-primary flex items-center">
      <FiMessageSquare className="mr-2" />
      Go to Chats
    </Link>
    <Link to="/logout" onClick={logoutHandler} className="btn btn-secondary flex items-center">
      <FiUsers className="mr-2" />
      Logout
    </Link></div>
      :<div className="flex justify-center space-x-4">
      <Link to="/login" className="btn btn-primary flex items-center">
      <IoIosLogIn className="mr-2" />
      Login
    </Link>
    <Link to="/send-otp" className="btn btn-secondary flex items-center">
      <FiUsers className="mr-2" />
      Signup
    </Link></div>}
        
        </div>
    </div>
  );
};

export default Home;

