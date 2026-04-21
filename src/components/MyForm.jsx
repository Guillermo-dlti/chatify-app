import React, { useState } from 'react'
import { socket } from '../socket';

function MyForm() {
    const [message, setMessage] = useState('');

    const handleOnChange = (e) => {
        setMessage(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();
        socket.emit('chat message', message);
    };

    return (
        <div className="flex items-center gap-3">
            <input
                type="text"
                name="message"
                value={message}
                onChange={handleOnChange}
                placeholder="Type a message..."
                className="flex-1 bg-[#020617] border border-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
            />
            <button
                onClick={handleClick}
                className="bg-purple-600 hover:bg-purple-500 active:scale-95 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
                Send
            </button>
        </div>
    )
}

export default MyForm;






// import React, { useState } from 'react'
// import { socket } from '../socket';

// function MyForm() {
//     const [message, setMessage] = useState('');

//     const handleOnChange = (e) => {
//         setMessage(e.target.value);
//     };

//     const handleClick = (e) => {
//         e.preventDefault();
//         socket.emit('chat message', message);
//     };




//     return (
//         <div>
//             <input
//                 type="text"
//                 name="message"
//                 value={message}
//                 onChange={handleOnChange}
//                 className='border-2'
//             />
//             <button onClick={handleClick}>Send</button>
//         </div>
//     )
// }

// export default MyForm;
