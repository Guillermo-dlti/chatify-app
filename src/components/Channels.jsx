function Channels({ currentRoom, onSelectRoom }) {
  const channels = ['General', 'Tech Talk', 'Random', 'Gaming']
  return (
    <div className="space-y-1 p-2 sm:p-3">
      {channels.map((ch) => {
        const active = currentRoom === ch
        return (
          <button
            key={ch}
            type="button"
            onClick={() => onSelectRoom(ch)}
            className={[
              'group relative w-full cursor-pointer border py-2.5 pl-3 pr-2 text-left text-sm transition-all duration-200 sm:py-3 sm:pl-4',
              active
                ? 'border-cyan-400/60 bg-gradient-to-r from-cyan-500/20 to-fuchsia-600/10 text-white shadow-[0_0_24px_rgba(34,211,238,0.25)]'
                : 'border-transparent text-slate-400 hover:border-cyan-500/25 hover:bg-white/5 hover:text-cyan-100',
            ].join(' ')}
            style={{
              clipPath: active
                ? 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            }}
          >
            {active && (
              <span
                className="pointer-events-none absolute left-0 top-1/2 h-[60%] w-0.5 -translate-y-1/2 bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
                aria-hidden
              />
            )}
            <span className="font-['Orbitron',sans-serif] text-[10px] tracking-widest text-cyan-500/80 group-hover:text-cyan-300/90 sm:text-xs">
              #
            </span>{' '}
            <span className="font-medium">{ch}</span>
          </button>
        )
      })}
    </div>
  )
}

export default Channels
