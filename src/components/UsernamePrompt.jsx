import { useEffect, useState } from 'react'

const ROOM_DESCRIPTIONS = {
  General: 'Main discussion room',
  'Tech Talk': 'Technology discussions',
  Random: 'Off-topic conversations',
  Gaming: 'Gaming and fun chat',
}

function UsernamePrompt({ room, rooms = [], allowRoomSelection = true, onSubmit }) {
  const [value, setValue] = useState('')
  const [selectedRoom, setSelectedRoom] = useState(room)

  useEffect(() => {
    setSelectedRoom(room)
  }, [room])

  const handleSubmit = (e) => {
    e.preventDefault()

    const username = value.trim()
    const roomToJoin = allowRoomSelection ? selectedRoom : room
    if (!username || !roomToJoin) return

    onSubmit({ username, room: roomToJoin })
    setValue('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-md">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md border border-cyan-500/30 bg-slate-900/95 p-6 shadow-[0_0_60px_rgba(34,211,238,0.15)] backdrop-blur-xl"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' }}
      >
        <h2 className="mb-4 text-center font-['Orbitron',sans-serif] text-2xl font-semibold uppercase tracking-widest text-cyan-200">
          Join Chatify
        </h2>
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
          Your Name
        </p>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your username"
          className="mb-4 w-full border border-cyan-500/25 bg-slate-950/80 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
        />

        {allowRoomSelection ? (
          <>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
              Select Room
            </p>
            <div className="mb-5 max-h-60 space-y-2 overflow-y-auto pr-1">
              {rooms.map((roomName) => {
                const isSelected = selectedRoom === roomName
                return (
                  <button
                    key={roomName}
                    type="button"
                    onClick={() => setSelectedRoom(roomName)}
                    className={[
                      'w-full border px-4 py-3 text-left transition',
                      isSelected
                        ? 'border-cyan-400/60 bg-cyan-500/10'
                        : 'border-slate-700/70 bg-black/35 hover:border-cyan-500/35 hover:bg-cyan-500/5',
                    ].join(' ')}
                  >
                    <p className="font-['Orbitron',sans-serif] text-sm font-semibold text-slate-100">{roomName}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {ROOM_DESCRIPTIONS[roomName] ?? 'Join this room'}
                    </p>
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <div className="mb-5 rounded border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">Room</p>
            <p className="mt-1 font-['Orbitron',sans-serif] text-sm text-cyan-100">{room}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!value.trim() || (allowRoomSelection && !selectedRoom)}
          className="w-full border border-fuchsia-400/50 bg-linear-to-r from-fuchsia-600/50 to-cyan-600/40 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(232,121,249,0.2)] transition hover:shadow-[0_0_32px_rgba(232,121,249,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {allowRoomSelection ? 'Join Room' : 'Continue'}
        </button>
      </form>
    </div>
  )
}

export default UsernamePrompt
