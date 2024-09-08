import { useEffect, useState } from "react";
import { FaBackward, FaCamera } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { newGroup, searching } from "../../Redux/Slices/chatSlice";
import { ActiveTab } from "../../assets/Functions/active";
import { Form } from "react-router-dom";
import { modalActivation } from "../../Redux/Slices/modalSlice";


function NewGroup() {
  const [selectedChats, setSelectedChats] = useState([]);
  const [nextState, setNextState] = useState(false);
  const[searchResult,setSearchResult]=useState([]);



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
            setSearchResult(res.payload.data)
        }
    }
    
}

useEffect(()=>{handleSearch()},[debouncedQuery,dispatch])

const searchResults = useSelector((state)=>state.chat).searchResults;
console.log("Use Selector result",searchResults)
console.log("query",query)


// adding contacts 

function handleSelectChats(chat) {
    setSelectedChats((prevChats) => {
      const isAlreadySelected = prevChats.some((selectedChat) => selectedChat._id === chat._id); 
      console.log(isAlreadySelected,"is Already Selected")
      // Use consistent property name
  
      if (isAlreadySelected) {
        // If the chat is already selected, remove it from the selectedChats array
        return prevChats.filter((selectedChat) => selectedChat._id !== chat._id);
      } else {
        // Otherwise, add the chat to the selectedChats array
        return [...prevChats, chat];
      }
    });
  }
  

console.log("Selected Chats",selectedChats)
  
  function handleNextState() {
    setNextState(true)
  }
  function handleBack() {
    setNextState(false);
  }
 
// handling group icon and group name

const [data,setData]= useState({
    groupName:"",
    groupDP:null
})

const [preview,setPreview]=useState(false);

 function handleFile(e){
    e.preventDefault()
    const uploadedImage = e.target.files[0]
    console.log(e.target.files)
    console.log(uploadedImage);

    if(uploadedImage){
     setData({...data,groupDP:uploadedImage})
    }
    const fileReader = new FileReader()
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load",function (){
        setPreview(this.result)
        console.log(this.result)
    })
 }

 function inputChangeHandler(e){
     const {name,value}= e.target;
     setData({...data,
        [name]:value
     })
     console.log("Group Name",e.target.value)
 }

async function handleSubmit(e){
    e.preventDefault();
    const formData = new FormData()
    formData.append("groupName",data.groupName)
    formData.append("groupDP",data.groupDP)
    formData.append("groupMembers",JSON.stringify(selectedChats))

    const res = await dispatch(newGroup(formData))
    console.log(res);
    if(res.statusCode===200){
        setData({
            groupDP:"",
            groupName:""
        })
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
          {nextState ? (
            <div onClick={handleBack} className=" btn btn-ghost rounded-md">
              <FaBackward></FaBackward>
            </div>
          ) : (
            <div 
            onClick={()=>{
                dispatch(modalActivation('modalNone'))
            }}

            className=" btn btn-ghost rounded-md font-bold bg-red-400 ">
              <IoIosCloseCircleOutline className="text-2xl text-white"></IoIosCloseCircleOutline>
            </div>
          )}
          <div className=" text-xl font-semibold text-primary justify-center">
            New Group
          </div>
        </div>
        <div>
         {
            nextState?"": <input
            onChange={(e)=>{
                if(e.target.value==="")setQuery("")
                else setQuery(e.target.value)
            }}
            className="w-full p-2 rounded-md  focus:outline-cyan-700  placeholder:text-black"
            type="text"
            placeholder="Enter Name or Email "
          ></input>
         }
        </div>
        <div
          className={` flex flex-row  w-[100%] h-24 ${
            selectedChats
              ? `border-b-2 overflow-x-scroll  border-slate-500 `
              : ` hidden`
          }  `}
        >
          {selectedChats
            ? selectedChats.map((e, idx) => (
                <div key={idx} className="">
                  <Card
                    key={idx}
                    scale={75}
                    isActive={true}
                    name={e.fullName}
                    email={e.email}
                    src={e.avatar}
                  ></Card>
                </div>
              ))
            : ""}
        </div>

        {nextState? (
          <div className="flex flex-col gap-2 mt-4 ">
            <div className=" flex flex-row gap-3 items-center">
              <div className=" ">
                <label htmlFor="icon">
                  <div className={`${preview?``:`btn`} rounded-full`}>
                  {preview?"":  <FaCamera className=" text-lg text-blue-500 "></FaCamera>}
                  </div>
                </label>
               {
                preview?<img   className="w-12 h-12 rounded-full"  src={preview}></img>
                : <input id="icon" 
                name="groupDP"
                onChange={handleFile}
                className=" hidden" type="file"></input>
               }
              </div>
              <p className=" font-semibold text-pretty">Add Group Icon</p>
            </div>

            <div className=" mb-3 mt-2">
              <input
                className="w-full p-2 rounded-md  focus:outline-cyan-700  placeholder:text-black"
                type="text"
                name="groupName"
                onChange={inputChangeHandler}
                placeholder="Enter Group Name "
              ></input>
            </div>
          </div>
        ) : 
            
          (<div
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
                  isActive={selectedChats.some((chat)=>chat._id===e._id)}
                  key={idx}
                  name={e.fullName}
                  email={e.email}
                  src={e.avatar}
                  
                ></Card>
               </div>
              );
            })}
          </div>
        )}

        {nextState ? (
          <button onClick={handleSubmit} className=" btn btn-primary">
            {" "}
            Save
          </button>
        ) : (
          <button onClick={handleNextState} className=" btn btn-secondary">
            {" "}
            Next
          </button>
        )}
      </div>
  
  );
}

export default NewGroup;
