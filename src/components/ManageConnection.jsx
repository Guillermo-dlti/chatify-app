import React from 'react'
import { socket } from '../socket'

const ManageConnection = () => {
  const handleConection = (con) => {
    console.log({ con })
    switch (con) {
      case 'on':
        socket.connect()
        break
      case 'off':
        socket.disconnect()
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <button type="button" onClick={() => handleConection('on')} className="btn-neon-connect">
        Connect
      </button>
      <button type="button" onClick={() => handleConection('off')} className="btn-neon-disconnect">
        Disconnect
      </button>
    </div>
  )
}

export default ManageConnection
