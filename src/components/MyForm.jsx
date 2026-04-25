import { useState } from 'react'
import { socket } from '../socket'

function MyForm({ username, room }) {
  const [message, setMessage] = useState('')

  const handleOnChange = (e) => {
    setMessage(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()

    if (!message.trim() || !username) return

    socket.emit('chat message', {
      content: message,
      username,
      room,
    })

    setMessage('')
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-3">
      <input
        type="text"
        name="message"
        value={message}
        onChange={handleOnChange}
        disabled={!username}
        placeholder={username ? 'Type a message…' : 'Connect & set username first'}
        className="min-h-11 flex-1 border border-cyan-500/25 bg-slate-950/70 px-3 py-2 text-sm text-white shadow-[inset_0_0_20px_rgba(34,211,238,0.04)] outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
        style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)' }}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={!username}
        className="group relative min-h-11 shrink-0 border border-fuchsia-400/50 bg-linear-to-r from-fuchsia-600/40 to-cyan-600/30 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(232,121,249,0.25)] transition hover:border-fuchsia-300/70 hover:shadow-[0_0_32px_rgba(232,121,249,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-25"
        style={{ clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' }}
      >
        <span className="font-['Orbitron',sans-serif] text-xs">Send</span>
      </button>
    </div>
  )
}

export default MyForm
