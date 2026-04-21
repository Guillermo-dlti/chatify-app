import { useState, useEffect } from 'react'
import { socket } from '../socket'
import ManageConnection from './components/ManageConnection'
import MyForm from './components/MyForm'
import Channels from './components/Channels'
import Chats from './components/Chats'
import Users from './components/Users'
import './App.css'

function App() {

  useEffect(() => {
    const onConnect = () => {
      console.log("conectado");
    };
    socket.on("connect", onConnect);

    return () => {
      socket.off('disconnect');
      socket.off('connect', onConnect);
    }
    // const onDisconnect = () => {
    //   console.log("desconectado");
    // }
    // socket.on("disocnnect", onDisconnect);
  }, [])

  return (
    <>
      <h1>Chatify</h1>
      <ManageConnection />

      <div className='flex items-center justify-between mt-10 w-full'>
        <div className='w-1/4 h-screen border-2'>
          <Channels />
        </div>
        <div className='w-1/2 h-screen border-2 flex flex-col justify-center'>
          <Chats />
          <MyForm />
        </div>
        <div className='w-1/4 h-screen border-2'>
          <Users />
        </div>
      </div>
    </>
  )
}

export default App
