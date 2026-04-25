import React, { useEffect, useState } from 'react'
import { socket } from '../socket'

function Chats() {
  const [messages, setMessage] = useState([])

  useEffect(() => {
    socket.on('chat message', (messageData) => {
      console.log('Mensaje desde Server: ', messageData)
      setMessage((prev) => [...prev, messageData])
    })

    socket.on('room history', (history) => {
      setMessage(history)
    })

    return () => {
      socket.off('chat message')
      socket.off('room history')
    }
  }, [])

  return (
    <div className="flex h-full min-h-0 flex-col">
      <h3 className="mb-2 shrink-0 border-b border-cyan-500/15 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300/80 sm:text-xs">
        Chats
      </h3>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-color:rgba(34,211,238,0.35)_transparent] sm:space-y-3">
        {messages?.map((m) => (
          <div
            key={m.id}
            className="relative border border-cyan-500/20 bg-slate-950/50 px-3 py-2.5 text-sm text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:px-4 sm:py-3"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)',
            }}
          >
            <span className="bg-linear-to-r from-cyan-300 to-fuchsia-300 bg-clip-text font-semibold text-transparent">
              {m.username}
            </span>
            <p className="mt-1 leading-relaxed text-slate-300">{m.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chats
