import React from 'react'

function Channels() {
  const channels = ['general', 'random', 'memes']
  return (
    // <div>
    //   <h1>Channels</h1>
    // </div>
    <div className="p-3 space-y-2">
      {channels.map((ch, i) => (
        <div
          key={i}
          className="px-3 py-2 rounded-md cursor-pointer text-sm text-gray-400 hover:bg-[#1e293b] hover:text-white transition"
        >
          # {ch}
        </div>
      ))}
    </div>
  )
}

export default Channels


