import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDown } from "react-icons/io";
import { FaPlus, FaSearch } from "react-icons/fa";
import { fetchAllChats, currentChatSearch, selectedChat } from "../../Redux/Slices/chatSlice";
import { modalActivation } from "../../Redux/Slices/modalSlice";
import { newGroupId } from "../../assets/Data/modalData";
import { useSocket } from "../../Context_API/socketContext";
import Card from "../../components/Card";
import Loader from "../../components/Loader";

export default function CurrentChats() {
  const dispatch = useDispatch();
  const socket = useSocket();
  
  const { chatsArr, searchCurrentChats, activeChat } = useSelector((state) => state.chat);
  const { notification, setNotification } = useSocket(); // Access notification from socket context

  const [activeChatLocal, setActiveChatLocal] = useState({});
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  console.log(chatsArr)

  // Debounce the search query input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    
    return () => clearTimeout(timerId);
  }, [query]);

  // Fetch chats and search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      dispatch(currentChatSearch(debouncedQuery));
    } else {
      dispatch(fetchAllChats());
    }
  }, [debouncedQuery, dispatch]);

  // Set active chat and join socket room
  const handleActiveChat = async (chat) => {
    if (activeChatLocal?._id === chat._id) {
      setActiveChatLocal(null); // Deselect if the same chat is clicked again
    } else {
      setActiveChatLocal(chat); // Set the clicked chat as active
      await dispatch(selectedChat(chat._id)); // Dispatch the selectedChat action
      socket?.emit('join_room', chat._id); // Join the room
    }
  };

  // Handle notification click
  const handleNotification = (id) => {
    dispatch(selectedChat(id));
    if (activeChat?._id === id) {
      const updatedNotification = notification.filter((e) => e.chat._id !== id);
      setNotification(updatedNotification);
    }
  };

  // Memoize notification items to prevent unnecessary re-renders
  const notificationItems = 
    notification.length > 0 
      ? notification.map((e, idx) => (
        <li key={idx} className="p-2" onClick={() => handleNotification(e.chat._id)}>
          <span>
            new Msg
            <button className="font-semibold text-cyan-500">{e.chat?.chatName}</button>
          </span>
        </li>
      ))
      : <span className="text-center">No Notification</span>
  

  return (
    <div>
      <div className="flex flex-col gap-2">
        {/* Header Section */}
        <div className="flex flex-row justify-between border-b-2 border-slate-300">
          <div className="p-4 cursor-pointer">
            <button
              id={`modal1`}
              onClick={() => dispatch(modalActivation({ index: newGroupId }))}
              className="btn btn-primary"
            >
              <FaPlus /> New Group
            </button>
          </div>

          {/* Notification Dropdown */}
          <div className="flex flex-row gap-2 p-4">
            <details className="dropdown ">
              <summary className="btn m-1">
                Messages <IoMdArrowDown />
              </summary>
              <ul className="menu dropdown-content bg-cyan-200 rounded-box z-[1] w-52 p-2 shadow overflow-y-scroll">
                {notificationItems}
              </ul>
            </details>
            <div className="badge badge-primary">{notification?.length}</div>
          </div>
        </div>

        {/* Search Input */}
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="text-center">
            <input
              className="w-auto p-2 outline-none border border-slate-500 rounded-md placeholder:text-blue-900"
              type="text"
              placeholder="Searching..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-info rounded-lg">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex flex-col gap-1 p-2">
          {(debouncedQuery ? searchCurrentChats : chatsArr)?.map((item, idx) => (
            <Card
              key={idx}
              name={` ${item.isGroupChat ? item.chatName : item.chatName}`}
              email={item.email}
              latestMessage={` ${item?.latestMessage?.content || "Welcome to the app"}`}
              sender={item?.latestMessage?.sender?.fullName}
              sentTime={new Date(item?.latestMessage?.sentTime).toLocaleString()}
              isActive={activeChatLocal && activeChatLocal._id === item._id}
              src={`${item.isGroupChat ? item.groupDP : item.groupMembers[0].avatar}`}
              onClick={() => handleActiveChat(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
