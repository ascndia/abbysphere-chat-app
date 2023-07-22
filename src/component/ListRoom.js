import React, { useContext } from 'react'
import { Heading } from '@chakra-ui/react'
import { color } from 'framer-motion'
import SocketContext from '../context/socket'

export default function ListRoom(props) {
    global = useContext(SocketContext)
    const { roomId, roomName, latestMessage, ProfilePirctures} = props
  return (
    <div className='Chats cp' onClick={() => {
      if(roomId === global.roomId) return
      global.socket.emit('join',roomId)
      global.setChatBuffer([])
      global.setRoomId(roomId)
      global.setRoomName(roomName)
      global.setProfilePicture(ProfilePirctures)
    }}>
        <div className='ProfilePictures'></div>
        <div className='ChatsPreview'>
            <Heading size={'sm'}>{roomName}</Heading>
            <p style={{'color':'grey'}}>{latestMessage}</p>
        </div>
    </div>
  )
}
