import { createSlice } from "@reduxjs/toolkit"

const initialState={
    activeSidebarIndex:localStorage.getItem('activeSidebarIndex')||"",
    activeChatIndex:localStorage.getItem('activeChatIndex')||"",
    activeChatModal:localStorage.getItem('activeChatModal')||""

}

const basicSlice = createSlice({
    initialState,
    name:'modal',
    reducers:{
       sidebarActivation:(state,action)=>{
        state.activeSidebarIndex= action.payload.activeIndex
        console.log(action.payload.activeIndex)
        localStorage.setItem('activeSidebarIndex',action.payload.activeIndex)
       },
       modalActivation:(state,action)=>{
        const payload = action.payload
        const index = payload.index;
        console.log("Payload:", payload)
          if(state.activeChatModal===index){
          state.activeChatModal=null;
          localStorage.setItem('activeChatModal',"")
          }
          else{
            state.activeChatModal=index;
            localStorage.setItem('activeChatModal',index)
          }
     }
    }
})
export const {sidebarActivation,modalActivation} =basicSlice.actions
export default basicSlice.reducer