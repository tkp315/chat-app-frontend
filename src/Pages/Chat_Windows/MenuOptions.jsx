import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { deleteChat, deleteGroup, leaveGroup } from "../../Redux/Slices/chatSlice";
import toast from "react-hot-toast";

export default function MenuOptions() {
  const chat = useSelector((state) => state.chat.activeChat);
  const user = useSelector((state) => state.user.userData);
  const userId = user._id;
  const isGroupChat = chat?.isGroupChat;
  const isAdmin = isGroupChat ? userId === chat.Admin._id : false;

  // leave group
  const dispatch =useDispatch();

  async function leavingTheGroup() {
    if(userId===chat?.Admin._id)toast.error(`Make someone admin first`)
    const res = await dispatch(leaveGroup(chat._id))
    console.log(res)
  }

  async function deleteTheGroup(){
    const res = await dispatch(deleteGroup(chat._id))
    console.log(res)
  }
  async function deleteTheChat(){
    const res = await dispatch(deleteChat(chat._id))
    console.log(res)
  }


  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Click
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        <li className=" rounded-md p-1">
            <input className=" w-full p-3  focus:outline-black active:bg-cyan-200 " type="text" placeholder="Search Msg"></input>
        </li>
        {isGroupChat ? (
          <>
            <li
            onClick={leavingTheGroup}
              className={`btn rounded-md p-1 mb-2 w-full ${
                isAdmin ? "" : "btn-error"
              }`}
            >
              Leave Group
            </li>

            {isAdmin && (
              <li 
              onClick={deleteTheGroup}
              className="btn-error btn rounded-md p-1 w-full">
                Delete Group
              </li>
            )}
          </>
        ) : (
          <li 
          onClick={deleteTheChat}
          className="btn-error btn rounded-md p-1 w-full">Delete Chat</li>
        )}
      </ul>
    </div>
  );
}
