import React from 'react'
import { useEffect, useState } from 'react'
import { socket } from '../../socket'


function Chats() {

  const [messages, setMessage] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg, serverOffset) => {
      console.log("Mensaje desde Server: ", msg);
      socket.auth.serverOffset = serverOffset;
      setMessage((prev) => [...prev, msg])
    });

    //Esto es para evitar que se duplique el mensaje. Clean up
    return () => {
      socket.off('chat message');
    }

  }, [])


  return (
    <div>
      <h1>Chats</h1>
      {messages?.map((m) => (
        <p>{m}</p>
      ))}
    </div>
  )
}

export default Chats;
