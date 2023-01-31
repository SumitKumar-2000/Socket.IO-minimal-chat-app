import { useState } from "react"
import ChatWindow from "./components/chatWindow"
import JoinChatWindow from "./components/joinChatWindow"

// socket import 
import {io} from "socket.io-client"

function App() {
 const socket = io.connect("http://localhost:8080")
 
 const [userName, setUserName] = useState("")
 const [roomId, setRoomId] = useState("")
 const [showChat, setShowChat] = useState(false)
 

  return (
    <div>
      {
        showChat ? <ChatWindow
          roomId={roomId}
          userName={userName}
          socket={socket}
        /> : <JoinChatWindow
          setShowChat={setShowChat}
          setUserName={setUserName}
          setRoomId={setRoomId}
          userName={userName}
          roomId={roomId}
          socket={socket}
        />
      }
    </div>
  )
}

export default App
