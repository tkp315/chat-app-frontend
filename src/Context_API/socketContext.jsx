import { useMemo } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {io} from 'socket.io-client'

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [notification,setNotification]=useState([]);
    const activeChat= useSelector((state)=>state.chat).activeChat
    useEffect(() => {
       
        const newSocket = io('https://chat-app-1-vrhe.onrender.com');
        // const newSocket =io(`http://localhost:5000`)
    console.log(newSocket)
      
        newSocket.on('connect', () => {
            console.log('connected with socket id', newSocket.id);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            console.log(`Socket with id ${newSocket.id} disconnected`);
        };
    }, []);

  

  
    // Providing an initial value to prevent 'null' checks in consuming components
    return (
        <SocketContext.Provider value={{socket,notification,setNotification}}>
            {children}
        </SocketContext.Provider>
    );
};
