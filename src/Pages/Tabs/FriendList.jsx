import React from 'react'
import Modal from '../../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { createChat } from '../../Redux/Slices/chatSlice';

function FriendList() {
  const friendData = useSelector((state)=>state.user).friendData;
  console.log("This is userData",friendData)
  const dispatch = useDispatch();
  const addToChat = async(data)=>{
   const res= await dispatch(createChat({receiverId:data}))
   console.log(res.payload.data)
  }
  return (
    <div className=' '>
<Modal heading={`My Contacts`} isSearch={true} extra={true} arr={friendData}addToChat={addToChat}></Modal>
  </div>   
  )
}
export default FriendList
