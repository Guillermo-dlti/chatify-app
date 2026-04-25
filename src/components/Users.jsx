import React, { useEffect, useState } from 'react'
import { socket } from '../socket'

function Users({ room, onUsersCountChange }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const onRoomUsers = (roomUsers) => {
      setUsers(roomUsers)
    }

    socket.on('room users', onRoomUsers)
    return () => {
      socket.off('room users', onRoomUsers)
    }
  }, [])

  useEffect(() => {
    setUsers([])
  }, [room])

  useEffect(() => {
    onUsersCountChange?.(users.length)
  }, [users, onUsersCountChange])

  return (
    <div className="space-y-1 p-2 sm:p-3">
      {users.map((u) => (
        <div
          key={u}
          className="flex items-center gap-3 border border-transparent py-2 pl-1 transition-colors hover:border-fuchsia-500/15 hover:bg-fuchsia-500/5 sm:py-2.5"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_10px_#bef264]" />
          </span>
          <span className="truncate text-sm text-slate-200">{u}</span>
          <span className="ml-auto hidden text-[9px] font-medium uppercase tracking-wider text-lime-300/80 sm:inline">
            Online
          </span>
        </div>
      ))}
      {users.length === 0 && (
        <p className="px-1 py-2 text-xs text-slate-400">
          No users online in {room}.
        </p>
      )}
    </div>
  )
}

export default Users
