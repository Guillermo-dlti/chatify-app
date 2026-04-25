import React from 'react'

function Users() {
  const users = ['Memo', 'Dani', 'Luis']
  return (
    <div className="space-y-1 p-2 sm:p-3">
      {users.map((u, i) => (
        <div
          key={i}
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
    </div>
  )
}

export default Users
