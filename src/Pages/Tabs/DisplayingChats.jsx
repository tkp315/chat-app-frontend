
import React, { useEffect, useState, useRef } from 'react';
import { BsFillEmojiSmileFill, BsSend } from 'react-icons/bs';
import { FiPhoneCall } from 'react-icons/fi';
import { IoIosAttach, IoMdVideocam } from 'react-icons/io';
import { MdKeyboardVoice, MdOutlineScheduleSend } from 'react-icons/md';
import { CiMenuKebab } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modalActivation } from '../../Redux/Slices/modalSlice';
import { seeProfile } from '../../assets/Data/modalData';
import { changeGroupDP, receiveMessages, selectedChat } from '../../Redux/Slices/chatSlice';
import { useSocket } from '../../Context_API/socketContext';
import { newMessage } from '../../Redux/Slices/chatSlice.js';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import MenuOptions from '../Chat_Windows/MenuOptions.jsx';
function DisplayingChats() {
    const chat = useSelector((state) => state.chat.activeChat);
    const user = useSelector((state) => state.user.userData);
    const userId = user._id;
    const isGroupChat = chat?.isGroupChat;
    const isAdmin = isGroupChat ? userId === chat.Admin._id : false;
    console.log(chat)
    // const messages = chat.allMessages;

    /* ****************** INITIALISATION *******************/

    const dispatch = useDispatch();
    const [socketConnected, setSocketConnected] = useState(false);
    const {socket} = useSocket();
    const selectedChatCompare = useRef('');
    useEffect(() => {
      socket?.emit('setup', user);
      socket?.on('connected', () => setSocketConnected(true));
  }, [socket, user]);

// ************ SEND MESSAGE **********************

//********** INPUT DATA */
const [content, setText] = useState('');
const[time, setTime]=useState(null);
const[date,setDate]=useState(null);
const newDate = new  Date(`${date}T${time}`);
const timeToSend = newDate.getTime()
console.log(newDate)

//*************** FUNCTIONS ******************/ 

const sendMessage = async () => {
  const chatId = chat._id?.toString();
  const res = await dispatch(newMessage({ chatId, content,timeToSend }));
  const result = res.payload?.data?.newlyCreatedMessage;
  if (res.payload?.statusCode === 200) {
      socket?.emit('new_message', result);
      
    
      setText(''); // Clear input after sending
      setTime(null);
      setDate(null);
      const isSender =user._id===result.sender;
console.log(`${isSender}: sender`)
  }
};
const getnewdate = (data)=>{
const date = new Date(data)
return `${date.toLocaleDateString()},${date.toLocaleTimeString()}`
}


// *************** RECEIVING MESSAGES **************
// play notification 
const notificationSound = new Audio ('/notification.mp3')
const messageSound = new Audio('/message.mp3')
console.log(notificationSound)
const playNotification=()=>{
try {
  notificationSound.play()
} catch (error) {
  console.log(error)
}
}
// play messageTone

const playMessageSound=()=>{
try {
  messageSound.play()
} catch (error) {
  console.log(error)
}
}
//** INPUT DATA **/

const [realTimeMessages, setRealTimeMessages] = useState([]);
const{notification, setNotification}=useSocket()

// 1.FUNCTION:API CALL

useEffect(() => {
  async function getAllMessages() {
      const res = await dispatch(receiveMessages({ chatId: chat._id }));
      const result = res.payload?.data?.messages?.allMessages;
      if (res.payload?.statusCode === 200) {
        console.log(result)
          setRealTimeMessages(result || []);
      }
  }

  getAllMessages();
  selectedChatCompare.current = chat;
}, [chat, dispatch]);

// 2. HANDLE RECEIVING MESSAGES REAL TIME

useEffect(() => {
  const handleReceiveMessage = (newMessageReceived) => {
    if (!selectedChatCompare.current || !selectedChatCompare.current._id || newMessageReceived?.chat?._id !== selectedChatCompare.current._id) {
      playNotification();
      setNotification((prevMessages) => [...prevMessages, newMessageReceived]);
    } else {
      playMessageSound()
      setRealTimeMessages((prevMessages) => [...prevMessages, newMessageReceived]);
    }
  };

  socket?.on('receive_message', handleReceiveMessage);

  return () => {
    socket?.off('receive_message', handleReceiveMessage);
  };
}, [socket, selectedChatCompare.current]);


// 3. GETTING STATUS OF MESSAGE
const [timeState,setTimeState]=useState('');
const [currTime,setCurrTime]=useState('')
useEffect(()=>{
  function getTime(currTime){
    if(new Date(currTime).getTime()>Date.now())setTimeState('Pending')
      else setTimeState('Sent')
    }
getTime()
},[Date.now()])

// 4. SCROLL TO THE BOTTOM

const chatRef = useRef('');
useEffect(()=>{
if(chatRef.current){
  chatRef.current.scrollTop= chatRef.current.scrollHeight;
}
},[realTimeMessages])
// isonline
const[isOnline,setIsOnline]=useState(null)
const[lastSeen,setLastSeen]=useState(null);
useEffect(()=>{
  socket?.on('user_online',(data)=>{
    console.log("Last Seen Data",data)
    setIsOnline(data);
    })
},[socket])

console.log(isOnline)


    return (
        <div className="flex flex-col gap-2 min-h-screen relative">
            {/* Header */}
            <div className="bg-cyan-500 p-1 rounded-b-md flex justify-between items-center">
                <div className="flex items-center cursor-pointer btn-ghost rounded-md p-2 bg-transparent border-none"
                    onClick={() => dispatch(modalActivation({ index: seeProfile }))}>
                    <div className="rounded-full">
                        <img className="rounded-full w-14 h-14"
                            src={
                              chat?.isGroupChat 
                                ? chat.groupDP 
                                : chat?.groupMembers?.length > 0 
                                  ? chat.groupMembers[0].avatar 
                                  : ""
                            }
                            alt="Chat Avatar" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="font-semibold flex-col flex gap-3">
                            {chat?.chatName}
                        </div>
                        <div>
                        {chat?.isGroupChat
        ? "Select for more info"
        : chat?.groupMembers?.length > 0
        ? chat.groupMembers[0].isOnline
            ? "ONLINE...."
            : chat.groupMembers[0].lastSeen
            ? new Date(chat.groupMembers[0].lastSeen).toLocaleString()
            : "No last seen available"
        : "Select more for info"
    }
                        </div>
                    </div>
                </div>
                <div className="flex gap-7">
                    <div className="flex gap-1 p-2 items-center mr-3 bg-slate-400 rounded-md">
                        <FiPhoneCall className="text-2xl" />
                        <IoMdVideocam className="text-2xl w-full" />
                    </div>
                   <MenuOptions></MenuOptions>
                </div>
            </div>

            

            {/* Middle (Messages display) */}
            <div
            ref={chatRef}
            className="flex flex-col gap-1 overflow-y-scroll h-[50vh] p-2">
                {realTimeMessages.length > 0 ? realTimeMessages.map((item, idx) => 
(
  <div key={idx} className={`chat ${user._id===item.sender?._id?`chat-end`:`chat-start  `}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={
          `${user._id===item.sender?._id? user.avatar:item?.sender?.avatar}`
        } ></img>
    </div>
  </div>
  <div className="chat-header">
 
    <time className="text-xs ">
      {getnewdate(item.sentTime)}
    </time>
  </div>
  <div className={`chat-bubble ${user._id===item.sender?._id?``:` chat-bubble-primary  `}`}>{item.content}</div>
 
</div>
               )

                   
                ) : "NO MESSAGES RIGHT NOW"}
            </div>

            {/* Footer */}
            <div className=' bg-slate-100  shadow-2xl shadow-cyan-600 absolute bottom-[12.5%] w-full rounded-t-md h-16 px-2 py-1'>
    <div className=' flex flex-row gap-10 items-center p-3 mb-5'>
        <div className=' flex flex-row gap-2'>
             <div className='cursor-pointer  hover:bg-blue-300 hover:scale-125 hover:rounded-md'>
             <BsFillEmojiSmileFill  className=' text-2xl text-yellow-500  '  />
             </div>
             <div className=' hover:bg-cyan-300 hover:scale-125 hover:rounded-md'>
                <IoIosAttach className=' text-2xl text-primary cursor-pointer'></IoIosAttach>
             </div>
             <div className=' hover:bg-cyan-300 hover:scale-125 hover:rounded-md '>
                <MdKeyboardVoice className=' text-2xl text-black' ></MdKeyboardVoice>
             </div>

        </div>

        <div className=' flex flex-row justify-center gap-2'>
        <div className=''>
            <input className=' w-96 p-2 focus:outline-none border border-purple-500 rounded-md
             placeholder:text-purple-400'
             onChange={(e)=>{
              console.log(e.target.value)
              setText(e.target.value)
             }}
            type='text'
            placeholder={` Say Something ${chat?.isGroupChat? `in`:`to`} ${chat?.chatName} `}

            >
            
            </input>
        </div>

        <div className='flex flex-row gap-4'>
            <button 
            onClick={sendMessage}
            className=' btn btn-success'>
                <BsSend></BsSend>
            </button>
           <div className=' dropdown dropdown-top '>
            
           <button 
          
            className=' btn btn-warning'>
                <MdOutlineScheduleSend className='text-xl'></MdOutlineScheduleSend>
            </button>
            <div tabIndex={0}  className=' items-center flex flex-row gap-2 dropdown-content menu bg-base-100 rounded-box z-[1] w-fit p-2  absolute right-1 shadow'>
           <div className=' flex flex-col gap-2'>
           <div className='flex flex-row w-fit gap-2'>
            <input 
            onChange={(e)=>{
              console.log(e.target.value)
              setTime(e.target.value)
            }}
            type='time' className=' input focus:outline-none  cursor-pointer input-bordered'></input>
            
            </div>
            <div className='flex flex-row w-fit gap-2'>
            <input 
            onChange={(e)=>{
              console.log(e.target.value)
              setDate(e.target.value)
            }}
            type='date' className=' input focus:outline-none  cursor-pointer input-bordered'></input>
           
            </div>
            </div>
            <button 
            onClick={sendMessage}
            className=' btn btn-primary'>Send</button>
           </div>
           </div>
        </div>
        </div>
    </div>
    </div>
    </div>

    );
}

export default DisplayingChats;


