 
        {/* *************** Single Chat ***********************8 */}
        {/* Chat Name */}
        {/* Last Seen */}
       {/* Photo */}
       {/* Email */}
      
       
       export default function SingleChatProfile({name, lastSeen, photo, email}) {
         return (
            <div className='flex flex-col gap-3 items-center'>
           <div className=" btn mt-1 shadow-none bg-transparent hover:bg-transparent border-none">
            <img 
            className=" image-full w-44 h-44 rounded-md" src={photo} >
            </img>
           </div>
          
           <div className=" text-xl mt-28">
            <span > Last Seen:</span>
            <span className="font-semibold text-lg text-cyan-500" >
                COMING SOON
            </span>
           </div>


           <div className=" text-xl">
            <span > Email:</span>
            <span className="font-semibold text-lg text-blue-700" >
                {email}
            </span>
           </div>

        </div>
       
         )
       }
       