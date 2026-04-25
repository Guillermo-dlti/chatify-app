function Channels({ currentRoom, onSelectRoom }) {
  const channels = ['General', 'Tech Talk', 'Random', 'Gaming']
  return (
    // <div>
    //   <h1>Channels</h1>
    // </div>
    <div className="p-3 space-y-2">
      {channels.map((ch) => (
        <button
          key={ch}
          onClick={() => onSelectRoom(ch)}
          className={`w-full px-3 py-2 rounded-md cursor-pointer text-left text-sm transition ${
            currentRoom === ch
              ? 'bg-purple-600 text-white'
              : 'text-gray-400 hover:bg-[#1e293b] hover:text-white'
          }`}
        >
          # {ch}
        </button>
      ))}
    </div>
  )
}

export default Channels
