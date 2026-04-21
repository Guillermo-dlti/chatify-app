import { useEffect } from 'react'
import { socket } from './socket'
import ManageConnection from './components/ManageConnection'
import MyForm from './components/MyForm'
import Channels from './components/Channels'
import Chats from './components/Chats'
import Users from './components/Users'
import './App.css'

function App() {
  useEffect(() => {
    const onConnect = () => {
      console.log('conectado')
    }

    socket.on('connect', onConnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0b1120] text-gray-200 px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Chatify</h1>
          </div>

          <div className="flex items-center gap-2">
            <ManageConnection />
          </div>
        </div>

        <div className="flex gap-4 h-[650px]">
          <div className="w-1/4 bg-[#111827] border border-gray-800 rounded-2xl p-4 shadow-lg">
            <h2 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
              Channels
            </h2>
            <Channels />
          </div>

          <div className="w-1/2 bg-[#111827] border border-gray-800 rounded-2xl shadow-lg flex flex-col overflow-hidden">
            <div className="border-b border-gray-800 px-4 py-3">
              <h2 className="text-sm font-semibold text-gray-300">General Chat</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <Chats />
            </div>

            <div className="border-t border-gray-800 px-4 py-4 bg-[#0f172a]">
              <MyForm />
            </div>
          </div>

          <div className="w-1/4 bg-[#111827] border border-gray-800 rounded-2xl p-4 shadow-lg">
            <h2 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
              Users
            </h2>
            <Users />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App














// import { useState, useEffect } from 'react'
// import { socket } from './socket'
// import ManageConnection from './components/ManageConnection'
// import MyForm from './components/MyForm'
// import Channels from './components/Channels'
// import Chats from './components/Chats'
// import Users from './components/Users'
// import './App.css'

// function App() {

//   useEffect(() => {
//     const onConnect = () => {
//       console.log("conectado");
//     };
//     socket.on("connect", onConnect);

//     return () => {
//       socket.off('disconnect');
//       socket.off('connect', onConnect);
//     }
//   }, [])

//   return (
//     <>
//       <h1>Chatify</h1>
//       <ManageConnection />

//       <div className='flex items-center justify-between mt-10 w-full'>
//         <div className='w-1/4 h-[600px] border-2'>
//           <Channels />
//         </div>
//         <div className='w-1/2 h-[600px] border-2 flex flex-col justify-center'>
//           <Chats />
//           <MyForm />
//         </div>
//         <div className='w-1/4 h-[600px] border-2'>
//           <Users />
//         </div>
//       </div>
//     </>
//   )
// }

// export default App
