

import './App.css'
import Chat from './Pages/Tabs/Chat'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import SendOTP from './Pages/Auth/SendOTP'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'
import ResetPassword from './Pages/Auth/ResetPassword'
import ResetToken from './Pages/Auth/ResetToken'
import { useSocket } from './Context_API/socketContext'




function App() {



  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
  
     <Routes>
      <Route element={<Home></Home>} path='/'></Route>
      <Route element={<Chat></Chat>} path='/chats'></Route>
      <Route element={<SendOTP></SendOTP>} path='/send-otp'></Route>
      <Route element={ <Signup></Signup>} path='/signup'></Route>
      <Route element={<Login></Login>} path='/login'></Route>
      <Route element={<ResetToken></ResetToken>} path='send-reset-token'></Route>
      <Route element={<ResetPassword></ResetPassword>} path='/reset-password'></Route>
    </Routes> 
    {/* <NewGroup></NewGroup> */}
   
   
    </div>
  )
}

export default App
