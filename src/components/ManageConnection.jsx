import React from 'react'
import { socket } from '../../socket'

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
    <div>
      <button onClick={() => handleConection('on')}>Connect</button>
      <button onClick={() => handleConection('off')}>Disconnect</button>
    </div>
  )
}

export default ManageConnection;



