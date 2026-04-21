import React from 'react'
import { socket } from '../socket'

const ManageConnection = () => {
  const onConnect = () => {
    console.log('Conectado')
  }

  const onDisconnect = () => {
    console.log('Desconectado')
  }

  const handleConection = (con) => {
    console.log({ con });
    switch (con) {
      case 'on':
        socket.connect();
        break;
      case 'off':
        socket.disconnect();
        break;
      default:
        break;
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleConection('on')}
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        Connect
      </button>

      <button
        onClick={() => handleConection('off')}
        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        Disconnect
      </button>
    </div>
  )
}

export default ManageConnection;








// import React from 'react'
// import { socket } from '../socket'

// const ManageConnection = () => {
//   const onConnect = () => {
//     console.log('Conectado')
//   }

//   const onDisconnect = () => {
//     console.log('Desconectado')
//   }

//   const handleConection = (con) => {
//     console.log({ con });
//     switch (con) {
//       case 'on':
//         socket.connect();
//         break;
//       case 'off':
//         socket.disconnect();
//         break;
//       default:
//         break;
//     }
//   }

//   return (
//     <div>
//       <button onClick={() => handleConection('on')}>Connect</button>
//       <button onClick={() => handleConection('off')}>Disconnect</button>
//     </div>
//   )
// }

// export default ManageConnection;



