import React, { useEffect, useState } from 'react'
import { socket } from '../socket'

function Chats({ username, room }) {
  const [messages, setMessage] = useState([])
  const [typingUser, setTypingUser] = useState('')

  const formatHour = (timestamp) => {
    if (!timestamp) return '--:--'
    const date = new Date(timestamp)
    if (Number.isNaN(date.getTime())) return '--:--'

    return date.toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  useEffect(() => {
    let typingTimeout

    socket.on('chat message', (messageData) => {
      console.log('Mensaje desde Server: ', messageData)
      setMessage((prev) => [...prev, messageData])
      setTypingUser('')
    })

    socket.on('room history', (history) => {
      setMessage(history)
      setTypingUser('')
    })

    socket.on('typing', (data) => {
      if (!data?.username || data.username === username) return

      setTypingUser(data.username)

      clearTimeout(typingTimeout)
      typingTimeout = setTimeout(() => {
        setTypingUser('')
      }, 3000)
    })

    return () => {
      socket.off('chat message')
      socket.off('room history')
      socket.off('typing')
      clearTimeout(typingTimeout)
    }
  }, [username, room])

  return (
    <div className="flex h-full min-h-0 flex-col">
      <h3 className="mb-2 shrink-0 border-b border-cyan-500/15 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300/80 sm:text-xs">
        Chats
      </h3>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-color:rgba(34,211,238,0.35)_transparent] sm:space-y-3">
        {messages?.map((m) => {
          const isCurrentUser = Boolean(username) && m.username === username

          return (
            <div key={m.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              <div
                className={[
                  'relative max-w-[80%] border px-3 py-2.5 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:max-w-[75%] sm:px-4 sm:py-3',
                  isCurrentUser
                    ? 'border-fuchsia-400/40 bg-fuchsia-600/25 text-fuchsia-50'
                    : 'border-cyan-500/25 bg-cyan-600/15 text-cyan-50',
                ].join(' ')}
                style={{
                  clipPath: isCurrentUser
                    ? 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)'
                    : 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={[
                      'font-semibold',
                      isCurrentUser
                        ? 'bg-linear-to-r from-fuchsia-200 to-pink-200 bg-clip-text text-transparent'
                        : 'bg-linear-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent',
                    ].join(' ')}
                  >
                    {isCurrentUser ? 'You' : m.username}
                  </span>
                  <span
                    className={[
                      'rounded border px-1.5 py-0.5 text-xs font-medium tabular-nums',
                      isCurrentUser
                        ? 'border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-100'
                        : 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100',
                    ].join(' ')}
                  >
                    {formatHour(m.created_at)}
                  </span>
                </div>
                <p className={`mt-1 leading-relaxed ${isCurrentUser ? 'text-fuchsia-100' : 'text-cyan-100'}`}>
                  {m.content}
                </p>
              </div>
            </div>
          )
        })}

        {typingUser && (
          <div className="flex justify-start">
            <div
              className="border border-cyan-500/25 bg-cyan-600/15 px-3 py-2 text-xs text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm"
              style={{
                clipPath:
                  'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
              }}
            >
              <span className="font-semibold text-cyan-200">{typingUser}</span> is typing...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chats
