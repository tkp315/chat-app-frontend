import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { createChat } from '../../Redux/Slices/chatSlice';
import { axiosInstance } from '../../assets/config/axios';

function FriendList() {
  const friendData = useSelector((state)=>state.user).friendData;
  console.log("This is userData",friendData)
  const dispatch = useDispatch();
  const addToChat = async(data)=>{
   const res= await dispatch(createChat({receiverId:data}))
   console.log(res.payload.data)
  }
  const [userList,setUserList] = useState([])
  const allUsers = async()=>{
    const res = await axiosInstance.get('/user/fetch-all-users')
    console.log(res)
    setUserList(res?.data?.data)
  }
  useEffect(()=>{allUsers()},[])
  return (
    <div className=' '>
<Modal heading={`My Contacts`} isSearch={true} extra={true} arr={userList}addToChat={addToChat}></Modal>
  </div>   
  )
}
export default FriendList
