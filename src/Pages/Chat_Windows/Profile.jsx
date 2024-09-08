import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import { useDispatch,useSelector } from 'react-redux'
import { modalActivation } from '../../Redux/Slices/modalSlice'
import SingleChatProfile from './SingleChatProfile'
import {TbPhotoEdit} from 'react-icons/tb'
import { CiEdit, CiMenuKebab } from 'react-icons/ci'
import { BsPlus, BsSave } from 'react-icons/bs'
import Card from '../../components/Card'
import { addNewMember, changeGroupDP, editGroupName } from '../../Redux/Slices/chatSlice'
import { FaUserCircle } from 'react-icons/fa'
import { selectContacts } from '../../assets/Data/modalData'
import MemberOptions from './MemberOptions'
import { ActiveTab } from '../../assets/Functions/active'

export default function Profile() {
    const dispatch = useDispatch()
    const chat = useSelector((state)=>state.chat).activeChat
    const user = useSelector((state)=>state.user).userData;
    const [edit,setEdit]=useState(false)
    const isGroupChat = chat.isGroupChat;
    console.log(chat.Admin)

    // editing photo

    const [preview,setPreview]=useState("");
    const [groupDP,setPhoto]=useState(null);
    const [isEditphoto,setIsEditPhoto]=useState(false);
    
    function imageHandler(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];

        setPhoto(uploadedImage);
        if(uploadedImage){
            setPhoto(uploadedImage)
            const file = new FileReader();
            file.readAsDataURL(uploadedImage);
            file.onload=function(){
            console.log(this.result)
            setPreview(this.result)
            }
        }

    }

    async function changeDP(){
        const formData = new FormData();
        console.log(groupDP)
        formData.append("groupDP",groupDP)
        const res = await dispatch(changeGroupDP({chatId:chat._id,formData:formData}))
        console.log(res)
    }

// change name 
 const [groupName,setGroupName]=useState("")
 async function changeGrpName(){
    // setEdit(false)
    const res = await dispatch(editGroupName({chatId:chat._id,newGroupName:groupName}))
    console.log(res);
    if(res.payload.statusCode===200){
        dispatch(modalActivation({index:""}))
        setEdit(false)
        setGroupName("");
    }
 }

 const chatArr = useSelector((state)=>state.chat).chatsArr
 console.log(chatArr)

const groupArr = chat?.groupMembers;
const newGroupArr = groupArr.map((e)=>{
const matchingChat = chatArr.find((item)=>item?.chatName===e?.fullName)
if(matchingChat){
    return {
        ...e,chatId:matchingChat._id
    }
}else{
    return e;
}
})
   

console.log(newGroupArr.flat())

// Add Members
// Remove Member
// Make Admin



  return (
    <div className=' min-h-[100vh] flex justify-center items-center '>
     <div className=' bg-white rounded-md shadow-lg shadow-cyan-300 w-[30%] h-[60vh] overflow-y-scroll mr-60'>
        {/* Group Name */}
        {/* Edit Photo */}
        {/* Edit Name */}
        {/* GroupMembers */}
       
       <div className='flex flex-col gap-1 '>
       <div className='flex flex-row px-3 py-2 items-center  gap-28'> 
        <div className=''>
            <button 
            onClick={()=>dispatch(modalActivation({index:'modalNone'}))}
            className=' btn btn-warning  '>
                <IoIosCloseCircle className=' text-2xl '></IoIosCloseCircle>
            </button>
        </div>
         <div className='font-semibold text-balance text-xl text-lime-600 text-center'>
                 {chat.chatName.toUpperCase()}
         </div>    
       
         </div>
         
           {/* photo */}
           {
            isGroupChat?
            <div className=' flex flex-col gap-8 items-center'>
            <div className='btn bg-transparent shadow-none hover:bg-transparent border-none flex flex-row '>
           
            {
                isEditphoto?(
                    preview?
                    (<div className=' flex flex-row gap-4'>
                        <img className=' image-full w-20 h-20 rounded-full' src={preview}></img>
                        <div>
                            <button 
                            onClick={changeDP}
                            className='btn btn-primary'>
                                Save
                            </button>
                        </div>
                    </div>)
                    :
                    <div className=' flex flex-row gap-3'>
                        <label htmlFor='photo'>
                            <FaUserCircle className=' cursor-pointer text-center text-4xl'></FaUserCircle>
                            <p className=' text-center'>Select Image</p>
                        </label>
                        <input name='groupDP' id='photo'
                        className=' hidden ' type='file'
                        onChange={imageHandler}></input>
                        
                    </div>
                    
                ):<div className=' flex flex-row gap-2 items-center '>
                     <img className="w-28 h-28 rounded-full" src={chat.groupDP} ></img>
                <TbPhotoEdit 
                onClick={()=>setIsEditPhoto(true)}
                className=' text-blue-500 text-3xl'></TbPhotoEdit>
            </div>
            }
            </div>

            <div className='flex flex-row gap-2  mt-10'>
             <div className=' mb-2'>
               {
                edit?
                <div className=' flex flex-row gap-3'>
                    <input className='bg-slate-200 p-2 rounded-md focus:outline-none shadow-xl shadow-cyan-300'
                    onChange={(e)=>setGroupName(e.target.value)}
                    ></input>

                    <div> 
                        <button 
                        onClick={changeGrpName}
                        className=' btn  btn-primary'>
                           <BsSave></BsSave>
                        </button>
                         </div>
                    
                </div>:
                (
                    <div className='flex flex-row gap-3 items-center '>
                        <div className=' w-fit bg-slate-300 p-2 rounded-md '>
                        {chat.chatName.toUpperCase()}
                    </div>
                    <div> 
                        <button 
                        onClick={()=>setEdit(true)}
                        className=' btn  btn-primary'>
                            <CiEdit className='text-2xl'></CiEdit>
                        </button>
                         </div>
                    </div>
                )
               }
             </div>
            </div>
            
            <div className=' flex flex-col gap-2'>
            <div className=' flex flex-row justify-between items-center'>
            <p className='text-lg font-semibold text-blue-500'>Group Members</p>
            { chat.Admin._id===user._id? <button 
            onClick={()=>dispatch(modalActivation({index:selectContacts}))}
            className=' btn btn-warning'>
                <BsPlus></BsPlus> Add Members
            </button>:""
}
            </div>

             {
                
                newGroupArr.map((card,idx)=>{
                    return <div className=' flex flex-row gap-1 ' key={idx}>
                        <Card 
                        name={card.fullName}
                        email={card.email}
                        src={card.avatar}
                        isAdmin={card._id===chat.Admin._id}
                        onClick={()=>ActiveTab()}
                         ></Card>
                         <MemberOptions chatId={chat._id} userId={card._id}  isAdmin={user._id===chat.Admin._id} memberChatId={card.chatId?card.chatId:null}></MemberOptions>
                        </div>
                })
             }
            </div>

             </div>  :<SingleChatProfile 
         
         email={chat?.groupMembers[0]?.email}
         photo={chat?.groupMembers[0]?.avatar}
         ></SingleChatProfile>
           }

       </div>
        

     </div>
    </div>
  )
}
