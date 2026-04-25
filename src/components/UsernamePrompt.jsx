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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-gray-800 bg-[#111827] p-6 shadow-lg"
      >
        <h2 className="mb-4 text-sm font-semibold text-white">
          Username for {room}
        </h2>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your username"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-[#020617] px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
        />

        <button className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500">
          Continue
        </button>
      </form>
    </div>
  )
}

export default UsernamePrompt
