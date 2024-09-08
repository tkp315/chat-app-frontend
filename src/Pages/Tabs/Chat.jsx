import { motion } from 'framer-motion'
import Header from '../../components/Header'
import CurrentChats from './CurrentChats'
import FriendList from './FriendList'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import Loader from '../../components/Loader'
import CallHistory from './CallHistory'
import NewGroup from './NewGroup'
import DisplayingChats from './DisplayingChats'
import Profile from '../Chat_Windows/Profile'
import AddNewContact from './AddNewContact'
import SelectContacts from './SelectContacts'


export default function Chat() {
const tabs = {
  home:<CurrentChats/>,
  contact_list:<FriendList/>,
  call_history:<CallHistory/>
}
const modal = {
  modal1:<NewGroup/>,
  modal2:<Profile></Profile>,
  modal3:<AddNewContact></AddNewContact>,
  modal4:<SelectContacts></SelectContacts>,
  modalNone:"",

}
const tabIdx = useSelector((state)=>state.modal).activeSidebarIndex
const modalIdx = useSelector((state)=>state.modal).activeChatModal
console.log(modalIdx)
console.log(tabIdx);
const[loadingModal,setLoadingModal]=useState(false)
  const [loading,setLoading]= useState(false)
  useEffect(()=>{
setLoading(true)


const timer = setTimeout(()=>{
  setLoading(false)
 
},500)

return ()=>clearTimeout(timer)
  },[tabIdx])
  return (
    <Header >
      <div className='flex h-[100vh] text-black '>
        
        <motion.div className='w-[40%] border-r-2 border-blue-500 bg-gray-100 h-[90vh] overflow-x-hidden mb-3 overflow-y-scroll'
        >
         {
           loading?<Loader></Loader>:tabIdx?tabs[tabIdx]:tabs['home']
         }
         
        </motion.div>
        {
          modalIdx?(<div className='z-30 w-full absolute left-[30%] top-0'>
           {
            modal[modalIdx]
           }
          </div>):""
        }
          

        {/* Main Chat Section */}
        <div className='w-[60%] bg-slate-200  shadow-md min-h-screen'>
        <DisplayingChats></DisplayingChats>
        </div>
      </div>
    </Header>
  )
}
