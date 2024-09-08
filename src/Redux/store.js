import { configureStore } from "@reduxjs/toolkit";
import modalSliceReducer from "./Slices/modalSlice";
import userSliceReducer from "./Slices/userSlice";
import chatSliceReducer from './Slices/chatSlice'



const store = configureStore({
    reducer:{
        modal:modalSliceReducer,
        user:userSliceReducer,
        chat:chatSliceReducer,
       

    }
})

export default store 