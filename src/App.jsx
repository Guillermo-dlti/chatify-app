import { useEffect, useState } from 'react'
import { socket } from './socket'
import ManageConnection from './components/ManageConnection'
import MyForm from './components/MyForm'
import Channels from './components/Channels'
import Chats from './components/Chats'
import Users from './components/Users'
import UsernamePrompt from './components/UsernamePrompt'
import './App.css'

const DEFAULT_ROOM = 'General'

function App() {
  const [currentRoom, setCurrentRoom] = useState(DEFAULT_ROOM)
  const [username, setUsername] = useState('')
  const [usernamesByRoom, setUsernamesByRoom] = useState({})
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false)

  const joinRoom = (room, nextUsername) => {
    socket.emit('join room', {
      username: nextUsername,
      room,
    })
  }

  const selectRoom = (room) => {
    if (currentRoom !== room) {
      socket.emit('leave room', { room: currentRoom })
    }

    setCurrentRoom(room)

    const storedUsername = usernamesByRoom[room]
    if (!storedUsername) {
      setUsername('')
      setShowUsernamePrompt(true)
      return
    }

    setUsername(storedUsername)
    setShowUsernamePrompt(false)
    joinRoom(room, storedUsername)
  }

  const saveUsernameForCurrentRoom = (nextUsername) => {
    setUsernamesByRoom((prevUsernamesByRoom) => ({
      ...prevUsernamesByRoom,
      [currentRoom]: nextUsername,
    }))
    setUsername(nextUsername)
    setShowUsernamePrompt(false)
    joinRoom(currentRoom, nextUsername)
  }

  useEffect(() => {
    const onConnect = () => {
      console.log('conectado')
      setUsername('')
      setShowUsernamePrompt(true)
    }

    socket.on('connect', onConnect)

    if (socket.connected) {
      onConnect()
    }

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect')
    }
  }, [])

  return (
    <div className="chatify-shell h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-white">
      <div className="chatify-grid" aria-hidden />
      <div className="chatify-scan" aria-hidden />

      <div className="chatify-content">
        <header className="shrink-0 px-4 pt-4 pb-3 sm:px-6">
          <div className="chatify-panel flex flex-wrap items-center justify-between gap-4 rounded-none px-4 py-3 sm:rounded-sm sm:px-5">
            <div className="flex min-w-0 flex-col gap-1">
              <h1 className="chatify-brand text-xl font-bold sm:text-2xl">Chatify</h1>
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-cyan-400/70 sm:text-xs">
                Live channel link
              </p>
            </div>
            <ManageConnection />
          </div>
          <div className="chatify-glow-line mt-2 max-w-full" aria-hidden />
        </header>

        <main className="flex min-h-0 flex-1 gap-2 px-2 pb-2 pt-1 sm:gap-3 sm:px-4 sm:pb-4">
          <aside className="chatify-panel flex w-[min(22%,280px)] min-w-[10.5rem] shrink-0 flex-col overflow-hidden rounded-sm sm:min-w-[12rem] sm:rounded-md">
            <div className="chatify-panel-header px-3 py-3 sm:px-4">
              <h2 className="font-['Orbitron',sans-serif] text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90 sm:text-xs">
                Channels
              </h2>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <Channels currentRoom={currentRoom} onSelectRoom={selectRoom} />
            </div>
          </aside>

          <section className="chatify-panel flex min-w-0 flex-1 flex-col overflow-hidden rounded-sm sm:rounded-md">
            <div className="chatify-panel-header flex items-center justify-between gap-2 px-3 py-3 sm:px-4">
              <div>
                <h2 className="truncate text-sm font-semibold text-white sm:text-base">{currentRoom}</h2>
                <p className="text-[10px] uppercase tracking-widest text-fuchsia-300/70">Active feed</p>
              </div>
              <span className="hidden shrink-0 rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-[9px] font-medium uppercase tracking-wider text-cyan-200 sm:inline">
                Encrypted
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden px-2 py-2 sm:px-4 sm:py-3">
              <Chats />
            </div>

            <div className="shrink-0 border-t border-cyan-500/15 bg-slate-950/40 px-2 py-3 backdrop-blur-sm sm:px-4">
              <MyForm username={username} room={currentRoom} />
            </div>
          </section>

          <aside className="chatify-panel flex w-[min(22%,280px)] min-w-[10.5rem] shrink-0 flex-col overflow-hidden rounded-sm sm:min-w-[12rem] sm:rounded-md">
            <div className="chatify-panel-header px-3 py-3 sm:px-4">
              <h2 className="font-['Orbitron',sans-serif] text-[10px] font-semibold uppercase tracking-[0.28em] text-fuchsia-300/90 sm:text-xs">
                Users
              </h2>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <Users />
            </div>
          </aside>
        </main>
      </div>

      {showUsernamePrompt && (
        <UsernamePrompt room={currentRoom} onSubmit={saveUsernameForCurrentRoom} />
      )}
    </div>
  )
}

export default App
