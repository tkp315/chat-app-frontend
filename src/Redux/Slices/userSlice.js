import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from 'react-hot-toast'
import { axiosInstance } from "../../assets/config/axios"

const initialState={
    isLoggedIn:JSON.parse(localStorage.getItem('isLoggedIn')||false),
    userData:JSON.parse(localStorage.getItem('userData'))||[],
    friendData:JSON.parse(localStorage.getItem('friendData'))||[]

}

export const sendOTPThunk = createAsyncThunk('sendOTP-thunk',async(data)=>{
    try{
      const res = await toast.promise(axiosInstance.post("/user/sendOTP",data),{
        loading:"Wait..",
        success:"OTP sent Successfully on E-mail",
        error:(error)=>{
         return error?.response?.data.message||"OTP not Sent"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const signupThunk = createAsyncThunk('signup-thunk',async(data)=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/user/signup",data),{
        loading:"Wait..",
        success:"Account created Successfully",
        error:(error)=>{
            return error?.response?.data.message||"Sign In Failed"
           }
      })

      return res.data
    }
    catch(error){
        return error.response.data.message
    }
})

export const loginThunk = createAsyncThunk('login-thunk',async(data)=>{
    try{
     const res = await toast.promise(axiosInstance.post("/user/login",data),{
        loading:"Wait..",
        success:"user logged In ",
        error:(data)=>{
            return data.response.data.message||"please try again"
        }
      })
      return res.data
    }
    
    catch(error){
        return error.response.message
    }
})

export const logoutThunk = createAsyncThunk('logout-thunk',async()=>{
    try{
      const res = await toast.promise(axiosInstance.post("/user/logout"),{
        loading:"Wait..",
        success:"user logged out ",
        error:(error)=>{
            return error.response.message||"please try again later"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const sendResetTokenThunk = createAsyncThunk('sendResetToken-thunk',async(data)=>{
    try{
     const res = await  toast.promise(axiosInstance.post("/user/send-reset-token",data),{
        loading:"Wait..",
        success:" Password Reset  Token Sent ",
        error:(error)=>{
            return error.response.message||"please try again later"
        }
      })
    return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const ResetPasswordThunk = createAsyncThunk('resetPassword-thunk',async(data)=>{
    try{
     const res =  await toast.promise(axiosInstance.post("/user/reset-password",data),{
        loading:"Wait..",
        success:" Password successfully reseted ",
        error:(error)=>{
            return error.response.message||"please try again later"
        }
      })
      return  res.data
    }
    catch(error){
        return error.response.message
    }
})


export const changeDPThunk = createAsyncThunk('change-dp-thunk',async(data)=>{
    try{
     const res=await toast.promise(axiosInstance.post("/user/change-dp",data),{
        loading:"Wait..",
        success:" DP is changed",
        error:(error)=>{
            return error.response.message||"please try again later"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.message
    }
})

export const userInfoThunk = createAsyncThunk('userInfo-thunk',async()=>{
    try{
     const res = await toast.promise(axiosInstance.post("/user/user-info"),{
        loading:"Wait..",
        success:"Fetched user ",
        error:(error)=>{
            return error.response.message||"please try again later"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.data.message
    }
    
})

export const makingFriendThunk = createAsyncThunk('make-friend-thunk',async(data)=>{
    try{
     const res = await toast.promise(axiosInstance.post("/user/new-friend",data),{
        loading:"Wait..",
        success:" New Friend  ",
        error:(error)=>{
            // console.log(error)
            return error?.response?.data?.message||"please try again later"
        }
      })
      return res.data
    }
    catch(error){
        return error.response.data.message
    }
    
})



const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(loginThunk.fulfilled,(state,action)=>{
            console.log(action.payload.data)
            const res = action.payload.data
            state.isLoggedIn=true
            localStorage.setItem('isLoggedIn',true)
            state.userData=res;
            localStorage.setItem('userData',JSON.stringify(res));
            
        })
        .addCase(makingFriendThunk.fulfilled,(state,action)=>{
            console.log(action.payload.data)
            const res = action.payload.data
            const newFriend = res.friend;
           
            state.friendData=[...state.friendData,newFriend];
            localStorage.setItem('friendData',JSON.stringify([...state.friendData,newFriend]))

        })
        .addCase(logoutThunk.fulfilled,(state,action)=>{
            state.isLoggedIn=false;
            
            localStorage.clear()
        })
    }
})

export default userSlice.reducer