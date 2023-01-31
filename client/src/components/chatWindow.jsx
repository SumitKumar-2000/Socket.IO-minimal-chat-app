import React, { useEffect, useState } from 'react'

const ChatWindow = ({roomId,userName,socket}) => {
  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  
  const handleMessageSending = async () => {
    if(message !== ""){
      const currMessagePayload = {
        roomId, 
        message,
        userName,
        time: new Date().getHours() + ":" + new Date().getMinutes()
      }
      
      await socket.emit("send_message",currMessagePayload)
      setChat(prevChat => [...prevChat,currMessagePayload])
      setMessage("")
    }
  }
  
  useEffect(() => {
    socket.on("recieve_message",(payload)=>{
      console.log("recieved data:",payload);
      setChat(prevchat => [...prevchat,payload])
    })
  },[socket])

  return (
    <div>
      <div className='sticky bg-black text-white text-center py-1  ' >
        Room ID - <span className='font-medium text-green-400' >{roomId}</span>
      </div>

      <div className=' w-[300px] mx-auto mt-[100px]'>
        <div className='mb-2 h-[320px] px-2 py-3 border border-bg-black overflow-x-hidden overflow-y-scroll'>
          {
            chat.length !== 0 ? chat.map((chatMessage,index) => {
              return <div key={index} >
                {chatMessage.message}
              </div>
            }) : <div className='text-center text-gray-400'> No message yet</div>
          }
        </div>
        <div className='flex'>
          <input 
            value={message}
            placeholder='Enter message'
            className='outline-none w-full px-2 py-1 border border-bg-black'
            onChange={e=>setMessage(e.target.value)}
          />
          <button
            onClick={handleMessageSending} 
            
            className='bg-black text-white px-3 ml-1 cursor-pointer'
          >Send</button>  
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
