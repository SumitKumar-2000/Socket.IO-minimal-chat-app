import React from 'react'

const JoinChatWindow = ({setShowChat,setUserName,setRoomId,userName,roomId,socket}) => {
  
  const joinChat = async () =>{
    if(userName !== "" && roomId !== ""){
      await socket.emit("join_room",{
        userName,
        roomId
      })
      setShowChat(true)
    }
  }

  return (
    <div className='w-[300px] mx-auto mt-[200px]'>
      <div 
        className='bg-black text-white mb-4 py-2 text-2xl text-center'
      >
        Join Room  
      </div>
      <div className='w-full' >
        <input 
          type="text" 
          placeholder='name'
          className='mb-4 outline-none w-full px-4 py-1 border border-bg-black'
          onChange={e=>setUserName(e.target.value)}
          />
        <input 
          type="text" 
          placeholder='Room ID'
          className='mb-4 outline-none w-full px-4 py-1 border border-bg-black'   
          onChange={e=>setRoomId(e.target.value)}    
          />
          <button onClick={joinChat} className='w-full bg-black py-1 text-white'>
            Submit
          </button>
        </div>
    </div>
  )
}

export default JoinChatWindow