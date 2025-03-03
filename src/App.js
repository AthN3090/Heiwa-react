import { createContext, useState ,useEffect} from 'react';
import './App.css';
import './output.css'
import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';
import {Routes, Route, Navigate} from 'react-router-dom'
import io from 'socket.io-client';
import Loader from './components/Loader/Loader';
export const userContext = createContext()
// const socket = io.connect("http://localhost:3001")
const socket = io.connect("https://heiwa-server.onrender.com")
function App() {

  const [user, setUser] = useState({
   
    id: null,
    username: null,
    feelings: null,
    interests: null,

  })
  useEffect(()=>{
    socket.on('connect', () => {
      setUser({
        ...user,
        id: socket.id,
        
      })
    })
    
}, [user])


  return (
    !user.id ? <Loader/>:
    <userContext.Provider value={{user, setUser, socket}}>
    <div className="App">
    <Routes>
      <Route exact path='/' index element={<Home/>} />
      <Route path='chat'  element={<Chat />} />
      <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
     
    </div>
    </userContext.Provider>
  );
}

export default App;
