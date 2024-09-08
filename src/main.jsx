
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/store.js'
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from './Context_API/socketContext.jsx'
createRoot(document.getElementById('root')).render(

  <Provider store={store}>
   <SocketProvider>
   <BrowserRouter>
    <App />
    <Toaster></Toaster>
  </BrowserRouter>
   </SocketProvider>
  </Provider>
 
)
