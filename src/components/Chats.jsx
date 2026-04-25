import React, { useEffect, useState } from 'react'
import { socket } from '../socket'

function Chats() {

  const [messages, setMessage] = useState([]);

  useEffect(() => {

    socket.on('chat message', (messageData) => {
      console.log("Mensaje desde Server: ", messageData);
      setMessage((prev) => [...prev, messageData])
    });

    socket.on('room history', (history) => {
      setMessage(history);
    });

    return () => {
      socket.off('chat message');
      socket.off('room history');
    }

  }, [])

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-sm font-semibold text-gray-300 mb-4 border-b border-gray-800 pb-2">
        Chats
      </h1>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages?.map((m) => (
          <div
            key={m.id}
            className="bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-200 shadow-sm"
          >
            <span className="font-semibold text-blue-400">
              {m.username}
            </span>
            <p>{m.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chats;