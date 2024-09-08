import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import { axiosInstance } from "../../assets/config/axios"
import { act } from "react"

const initialState = {
    chatsArr:JSON.parse(localStorage.getItem('chatsArr'))||[],
    searchResults:[],
    searchCurrentChats:[],
    activeChat:JSON.parse(localStorage.getItem('activeChat'))||'',
    newMessage:JSON.parse(localStorage.getItem('newMessage'))||{}


}

export const createChat = createAsyncThunk('create-chat',async(data)=>{
    try{
      const res = await toast.promise(axiosInstance.post("/chat/create-chat",data),{
        loading:"Wait..",
        success:" Creating chat",
        error:(error)=>{
         return error?.response?.data.message||"Chat not Created"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const deleteChat = createAsyncThunk('delete-chat',async(data)=>{
  try{
    const res = await toast.promise(axiosInstance.post(`/chat/delete-chat/${data}`),{
      loading:"Wait..",
      success:" chat Deleted",
      error:(error)=>{
       return error?.response?.data.message||"Chat not Deleted"
      }
    })
    return res.data
  }
  catch(error){
      return error.response.message
  }
})


export const fetchAllChats = createAsyncThunk('fetchAllChats',async()=>{
    try{
      const res = await toast.promise(axiosInstance.post("/chat/fetchAllChats"),{
        loading:"Wait..",
        success:" Fetched Chats",
        error:(error)=>{
         return error?.response?.data.message||"Oops, Chat not fetched"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const selectedChat = createAsyncThunk('selectedChat',async(data)=>{
    try{
      const res = await toast.promise(axiosInstance.post(`/chat/selectedChat/${data}`),{
        loading:"Wait..",
        success:"chat selected",
        error:(error)=>{
         return error?.response?.data.message||"Oops, Chat not fetched"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

/* search-query */

export const searching = createAsyncThunk('search',async(query)=>{
    try{
      const res = await toast.promise(axiosInstance.get(`/chat/search?query=${query}`),{
        loading:"Wait..",
        success:"Found result",
        error:(error)=>{
         return error?.response?.data.message||"Oops, Chat not fetched"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const currentChatSearch = createAsyncThunk('searchInChats',async(query)=>{
  try{
    const res = await toast.promise(axiosInstance.get(`/chat/search-chats?chatName=${query}`),{
      loading:"Wait..",
      success:"Found result",
      error:(error)=>{
       return error?.response?.data.message||"Oops, Chat not fetched"
      }
    })
    return res.data
  }
  catch(error){
      return error.response.message
  }
})

/* Group-chat */

export const newGroup = createAsyncThunk('newGroup',async(data)=>{
    try{
      const res = await toast.promise(axiosInstance.post(`/chat/create-group`,data),{
        loading:"Wait..",
        success:"new group created",
        error:(error)=>{
         return error?.response?.data.message||"Group not created"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const changeAdmin = createAsyncThunk('changeAdmin',async(data)=>{
    try{
      const res = await toast.promise(axiosInstance.post(`/chat/make-admin/${data.chatId}`,{newAdminId:data.newAdminId}),{
        loading:"Wait..",
        success:"new Admin assigned",
        error:(error)=>{
         return error?.response?.data.message||"Not assigned"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const addNewMember = createAsyncThunk('addNewMember',async(data)=>{
    try{
      const res = await toast.promise(axiosInstance.post(`/chat/add-new-Member/${data.chatId}`,{newMemberId:data.newMemberId}),{
        loading:"Wait..",
        success:"new member added",
        error:(error)=>{
         return error?.response?.data.message||"new member not added"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})


export const removeMember = createAsyncThunk('removeMember',async(data)=>{
    try{
      const res = await toast.promise(axiosInstance.post(`/chat/remove-member/${data.chatId}`,{personId:data.personId}),{
        loading:"Wait..",
        success:"Removed a member",
        error:(error)=>{
         return error?.response?.data.message||"unable to remove member"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const leaveGroup = createAsyncThunk('leaveGroup',async(chatId)=>{
    try{
      const res = await toast.promise(axiosInstance.post(`/chat/leave-group/${chatId}`),{
        loading:"Wait..",
        success:"User has left the group",
        error:(error)=>{
          console.log (error)
         return error?.response?.data.message||"unable to leave "
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const deleteGroup = createAsyncThunk('deleteGroup',async(chatId)=>{
    try{
      const res = await toast.promise(axiosInstance.post(`/chat/delete-group/${chatId}`),{
        loading:"Wait..",
        success:"Group has Deleted ",
        error:(error)=>{
         return error?.response?.data.message||"unable to delete delete"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const changeGroupDP = createAsyncThunk('changeGroupDP',async(data)=>{
    try{
      const res = await toast.promise(axiosInstance.post(`/chat/change-dp/${data.chatId}`,data.formData),{
        loading:"Wait..",
        success:" Group DP has changed ",
        error:(error)=>{
         return error?.response?.data.message||"unable to change dp"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const editGroupName = createAsyncThunk('edit-group-name',async(data)=>{
    try{
      console.log('data received',data)
      const res = await toast.promise(axiosInstance.post(`/chat/edit-group-name/${data.chatId}`,{newGroupName:data.newGroupName}),{
        loading:"Wait..",
        success:" Group name changed ",
        error:(error)=>{
         return error?.response?.data.message||"unable to change groupName"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const fetchAllGroups = createAsyncThunk('fetch-all-groups',async(chatId)=>{
    try{
      const res = await toast.promise(axiosInstance.post(`/chat/fetch-all-groups/${chatId}`),{
        loading:"Wait..",
        success:" Fetched All The Groups ",
        error:(error)=>{
         return error?.response?.data.message||"unable to fetch group"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const newMessage = createAsyncThunk('new-message',async(data)=>{
  console.log(data)
  try{
  
    const res = await toast.promise(axiosInstance.post(`/message/send-message/${data.chatId}`,{content:data.content,timeToSend:data.timeToSend}),{
      loading:"Wait..",
      success:"Sending message",
      error:(error)=>{
       return error?.response?.data.message||"Chat not Created"
      }
    })
    return res.data
  }
  catch(error){
      return error.response.message
  }
})

export const receiveMessages = createAsyncThunk('receive-messages',async(data)=>{
  console.log(data)
  try{
  
    const res = await toast.promise(axiosInstance.post(`/message/get-message/${data.chatId}`),{
      loading:"Wait..",
      success:"Fetching all messages",
      error:(error)=>{
       return error?.response?.data.message||"Chat not Created"
      }
    })
    return res.data
  }
  catch(error){
      return error.response.message
  }
})



const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllChats.fulfilled,(state,action)=>{
            const res =action.payload.data.allChats
            console.log(res);
            state.chatsArr=res
            localStorage.setItem('chatsArr',JSON.stringify(res))
            
        })
        .addCase(createChat.fulfilled,(state,action)=>{
          console.log(action.payload.data.friend)
          state.chatsArr=[...state.chatsArr,...action.payload.data.friend]
          localStorage.setItem('chatsArr',JSON.stringify([...state.chatsArr,...action.payload.data.friend]))
        })
        .addCase(newGroup.fulfilled,(state,action)=>{
          const res =action.payload.data
          console.log(res);
          state.chatsArr=[...state.chatsArr,res.newChat];
          localStorage.setItem('chatsArr',JSON.stringify([...state.chatsArr,res.newChat]))
          
      })
        .addCase(searching.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.searchResults= action.payload.data
           
        })
        .addCase(selectedChat.fulfilled,(state,action)=>{
          console.log(action.payload.data.chat)
          if(action.payload.statusCode===500){
            state.activeChat= null
          localStorage.setItem('activeChat',JSON.stringify(null))
          }
          state.activeChat= action.payload.data.chat
          localStorage.setItem('activeChat',JSON.stringify(action.payload.data.chat))
         
      })
        .addCase(currentChatSearch.fulfilled,(state,action)=>{
          console.log(action?.payload)
          state.searchCurrentChats= action?.payload?.data
          
      })
      .addCase(newMessage.fulfilled,(state,action)=>{
        console.log(action?.payload)
    })
      
    }
})

export default chatSlice.reducer