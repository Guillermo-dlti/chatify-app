import React from 'react'
import { useEffect, useState } from 'react'
import { socket } from '../socket'

function Chats() {

  const [messages, setMessage] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg, serverOffset) => {
      console.log("Mensaje desde Server: ", msg);
      socket.auth.serverOffset = serverOffset;
      setMessage((prev) => [...prev, msg])
    });

    //Esto es para evitar que se duplique el mensaje. Clean up
    return () => {
      socket.off('chat message');
    }

  }, [])

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-sm font-semibold text-gray-300 mb-4 border-b border-gray-800 pb-2">
        Chats
      </h1>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages?.map((m, index) => (
          <div
            key={index}
            className="bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-200 shadow-sm"
          >
            {m}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chats;








// import React from 'react'
// import { useEffect, useState } from 'react'
// import { socket } from '../socket'


// function Chats() {

//   const [messages, setMessage] = useState([]);

//   useEffect(() => {
//     socket.on('chat message', (msg, serverOffset) => {
//       console.log("Mensaje desde Server: ", msg);
//       socket.auth.serverOffset = serverOffset;
//       setMessage((prev) => [...prev, msg])
//     });

//     //Esto es para evitar que se duplique el mensaje. Clean up
//     return () => {
//       socket.off('chat message');
//     }

//   }, [])


//   return (
//     <div>
//       <h1>Chats</h1>
//       {messages?.map((m) => (
//         <p>{m}</p>
//       ))}
//     </div>
//   )
// }

// export default Chats;
