import React, { useEffect, useState } from 'react'
import Input from './Input'
import Card from './Card'
import { ActiveTab } from '../assets/Functions/active';
import { useDispatch } from 'react-redux';
import { modalActivation } from '../Redux/Slices/modalSlice';
import { fetchAllChats, searching } from '../Redux/Slices/chatSlice';

export default function Modal({heading, isSearch, arr, extra, addToChat}) {
  const dispatch = useDispatch();
  const [activeIdx, setActiveIdx] = useState(null);

  function handleChat(eid) {
    console.log("Chat ID:", eid);
    addToChat(eid);  // Directly pass the `eid` to `addToChat`
  }
// set Debounced query 
const[query,setQuery]=useState('');
const[debouncedQuery,setDebouncedQuery]=useState(query);

useEffect(()=>{
  const timerId = setTimeout(()=>{
    setDebouncedQuery(query)
  },500)
},[query,dispatch])

const [searchResult,setSearchResult]=useState([])

useEffect(()=>{
async function search(){
  if(debouncedQuery){
    const res = await dispatch(searching(debouncedQuery))
    setSearchResult(res.payload.data)
    console.log(res)
  }
}
search()
},[debouncedQuery,dispatch])
 const displayChats=debouncedQuery?searchResult:arr;
  console.log(displayChats)
  return (
    <div className='h-[90vh] flex flex-col overflow-y-scroll overflow-x-hidden p-2 min-w-fit'>
      <div className='text-2xl font-bold justify-start mb-3'>
        {heading}
      </div>

      {isSearch ? (
        <div>
          <input
            className='input w-full placeholder:text-black placeholder:rounded-md bg-warning focus:outline-none'
            placeholder='Enter phone or email'
            onChange={(e)=>setQuery(e.target.value)}
          />
        </div>
      ) : ""}

      <div className='mt-3 mb-4' onClick={() => dispatch(modalActivation({ index: 'modal3' }))}>
        {extra ? (
          <Card 
            name="Add New Contact"
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKp1rw7XZoIhP4Fi2ppZ-hkCI-cD7eSjr1cg&s`}
            ah={`10`}
            aw={`10`}
          />
        ) : ""}
      </div>

      <div className='flex flex-col gap-3'>
        {displayChats?.map((e, idx) => (
          <div key={idx} onClick={() => handleChat(e._id)}>
            <Card
              key={idx}
              name={e.fullName}
              email={e.email}
              isActive={activeIdx === idx}
              // onClick={() => ActiveTab(idx, activeIdx, setActiveIdx)}
              src={e.avatar}
              aw="10"
              ah="10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
