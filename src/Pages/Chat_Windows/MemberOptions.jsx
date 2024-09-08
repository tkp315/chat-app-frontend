import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { changeAdmin, removeMember, selectedChat,createChat } from "../../Redux/Slices/chatSlice";
import { useDispatch } from "react-redux";
import { modalActivation } from "../../Redux/Slices/modalSlice";
import { ActiveTab } from "../../assets/Functions/active";

export default function MemberOptions({ isAdmin,chatId,userId ,memberChatId}) {
    const dispatch= useDispatch()

    // select chat
    const [activeTab,setActiveTab]=useState('')
    async function selectChat() {
        if(memberChatId){
            setActiveTab(userId)
            const res = await dispatch(selectedChat(memberChatId))
          
            console.log(res)
        }
        else{
            const res = await dispatch(createChat({recieverId:userId}))
            console.log(res)
        }
       
    }
    // remove member

    async function removeAMember(){
        const res= await dispatch(removeMember({chatId:chatId,personId:userId}));
        console.log(res);
    }
    // make admin

    async function makeSomeoneAdmin(){
        const res = await dispatch(changeAdmin({chatId:chatId,newAdminId:userId}))
        console.log(res);
    }

  return (
    <div className="">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          <CiMenuKebab></CiMenuKebab>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            {" "}
            <button 
            onClick={selectChat}
             className=" ">Message</button>{" "}
          </li>
          {isAdmin ? (
            <div>
              <li>
                {" "}
                <button
                onClick={removeAMember}
                >Remove </button>{" "}
              </li>
              <li>
                {" "}
                <button
                onClick={makeSomeoneAdmin}
                >Make Admin</button>{" "}
              </li>
             
            </div>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}
