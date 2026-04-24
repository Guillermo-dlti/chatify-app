import React from 'react'

function Users() {
  const users = ['Memo', 'Dani', 'Luis']
  return (
    // <div>
    //   <h1>Users</h1>
    // </div>
    <div className="p-3">
      {/* <h2 className="text-xs text-gray-500 mb-2 uppercase">
        Online
      </h2> */}
      {users.map((u, i) => (
        <div key={i} className="flex items-center gap-2 py-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-300">{u}</span>
        </div>
      ))}
    </div>
  )
}

export default Users

