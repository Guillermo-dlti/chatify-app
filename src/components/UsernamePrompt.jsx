import { useState } from 'react'

function UsernamePrompt({ room, onSubmit }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const username = value.trim()
    if (!username) return

    onSubmit(username)
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
        className="relative w-full max-w-sm border border-cyan-500/30 bg-slate-900/90 p-6 shadow-[0_0_60px_rgba(34,211,238,0.15)] backdrop-blur-xl"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' }}
      >
        <h2 className="mb-1 font-['Orbitron',sans-serif] text-sm font-semibold uppercase tracking-widest text-cyan-200">
          Identity
        </h2>
        <p className="mb-4 text-xs text-slate-400">
          Username for <span className="text-fuchsia-300">{room}</span>
        </p>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your username"
          className="mb-4 w-full border border-cyan-500/25 bg-slate-950/80 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(34,211,238,0.12)]"
        />

        <button
          type="submit"
          className="w-full border border-fuchsia-400/50 bg-linear-to-r from-fuchsia-600/50 to-cyan-600/40 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_0_24px_rgba(232,121,249,0.2)] transition hover:shadow-[0_0_32px_rgba(232,121,249,0.35)]"
        >
          Continue
        </button>
      </form>
    </div>
  )
}

export default UsernamePrompt
