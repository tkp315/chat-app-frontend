import React from 'react'
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addNewMember, searching } from '../../Redux/Slices/chatSlice';
import { modalActivation } from '../../Redux/Slices/modalSlice';
import { FaBackward } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Card from '../../components/Card';
import toast from 'react-hot-toast';

export default function SelectContacts() {
    const [selectedChats, setSelectedChats] = useState();
    const[searchResult,setSearchResult]=useState([]);
    const chat = useSelector((state)=>state.chat).activeChat;
    console.log("this is chat",chat)
    const groupMembers= chat?.isGroupChat?chat.groupMembers:[];
    console.log("This is groupMember",groupMembers)
  
  // search functionality
  const[query,setQuery]=useState("");
  const [debouncedQuery,setDebouncedQuery]=useState(query);
  const dispatch = useDispatch()
  
  useEffect(()=>{
      const timer = setTimeout(()=>{
          if(query!=="")setDebouncedQuery(query)
      },500)
  
      return ()=>clearTimeout(timer)
  },[query])
  
  async function handleSearch(){
      if(debouncedQuery){
          const res = await dispatch(searching(debouncedQuery))
          console.log("Search query Results",res.payload.data)
          if(res.payload.statusCode===200){
            const arr= res.payload.data;
            // const filteredArr = groupMembers?.filter((e)=> !arr.some((item)=>item._id===e._id) )||[]
              setSearchResult(arr)
          }
      }
      
  }
  
  useEffect(()=>{handleSearch()},[debouncedQuery,dispatch])
  
  const searchResults = useSelector((state)=>state.chat).searchResults;
  console.log("Use Selector result",searchResults)
  console.log("query",query)
  
  
  // adding contacts 
  
  function handleSelectChats(chat) {
      setSelectedChats(chat)
    }
    
  
  console.log("Selected Chats",selectedChats)
    
    
   
  // handling adding new member in group 
  
  async function handleSubmit(receiverId){
    receiverId=selectedChats._id
      
      const res = await dispatch(addNewMember({newMemberId:receiverId,chatId:chat._id}))
      console.log(res);
      if(res.statusCode===200){
          dispatch(modalActivation({index:""}))
      }
  }
  // closing
  const friendList = useSelector((state)=>state.user).friendData;
  console.log(friendList);
  const displayChats = searchResult.length>0?searchResult:friendList;
  
  
  return (
    <div className="flex flex-col py-4  px-8 w-[30%]  shadow-lg rounded-md gap-2 bg-slate-400">
    {/* heading */}
    {/* search*/}
    {/* space for selected user */}
    {/* space for rendering search */}
    {/* button */}
    <div className=" flex flex-row gap-14 items-center">
      
        <div 
        onClick={()=>{
            dispatch(modalActivation('modalNone'))
        }}

        className=" btn btn-ghost rounded-md font-bold bg-red-400 ">
          <IoIosCloseCircleOutline className="text-2xl text-white"></IoIosCloseCircleOutline>
        </div>
      

      <div className=" text-xl font-semibold text-primary justify-center">
       {chat?.chatName}
      </div>
    </div>
    <div>
     
         <input
        onChange={(e)=>{
            if(e.target.value==="")setQuery("")
            else setQuery(e.target.value)
        }}
        className="w-full p-2 rounded-md  focus:outline-cyan-700  placeholder:text-black"
        type="text"
        placeholder="Enter Name or Email "
      ></input>
     
    </div>
    <div
      className={` flex flex-row  w-[100%] h-24 ${
        selectedChats
          ? `border-b-2 overflow-x-scroll  border-slate-500 `
          : ` hidden`
      }  `}
    >
      
        
            <div  className="m-3">
              <Card
                
                scale={75}
                isActive={true}
                name={selectedChats?.fullName}
                email={selectedChats?.email}
                src={selectedChats?.avatar}
              ></Card>
            </div>
          
        
    </div>


        
      <div
        className={` flex flex-col  gap-2 ${
          searchResult? `h-[45vh] w-[100%] overflow-y-scroll` : `hidden`
        } `}
      >
        <p className="font-semibold text-purple-700">All Users</p>
        {displayChats?.map((e, idx) => {
          return (
           <div 
          
           key={idx}>
             <Card
              onClick={()=>handleSelectChats(e)}
              isActive={selectedChats?._id===e._id}
              key={idx}
              name={e.fullName}
              email={e.email}
              src={e.avatar}
              
            ></Card>
           </div>
          );
        })}
      </div>
    

     
      <button onClick={handleSubmit} className=" btn btn-primary">
        {" "}
        Save
      </button>
    
  </div>
  )
}
