import { SearchIcon,  } from '@chakra-ui/icons'
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import ChatChild from './ChatChild'
import SocketContext from '../context/socket'

export default function ChatList() {

  const global = useContext(SocketContext)
  const {roomId, chatData, setChatData, chatBuffer, setChatBuffer} = global

  const [newMessage,setNewMessage] = useState('')
  
  const ChatList = chatData.map(message => (
    <ChatChild key={message.id} {...message} />
  ))

  const chatListRef = useRef(null)
  const messageInput = useRef(null) 

  useEffect(()=>{
    setChatData([...chatData, ...chatBuffer])
    setChatBuffer([])
    scrollToBottom()
  },[])

  useEffect(()=>{
    scrollToBottom()
  },[chatData])

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  };

  const SendMessage = () => {
    if(!newMessage) return
    global.socket.emit('message',roomId,{
      message:newMessage,
      userid:global.data.selfId,
      username:global.data.selfName
    })
    messageInput.current.value = ''
    setNewMessage('')
    messageInput.current.focus()
  }

  const HandleEnter = (event) => {
    if(!newMessage) return
    if(event.key === 'Enter'){
      global.socket.emit('message',roomId,{
        message:newMessage,
        userid:global.data.selfId,
        username:global.data.selfName
      })

      messageInput.current.value = ''
      setNewMessage('')
      messageInput.current.focus()
    }
  }

  return (
    <div id='ChatContainer'>
      <div id='ChatList' ref={chatListRef}>
        {ChatList}
      </div>
      <div id='SendMessage'>
          <InputGroup onKeyDown={HandleEnter} >
              <InputRightElement onClick={SendMessage} pointerEvents='pointer'>
                <IoSend size={'20px'} cursor={'pointer'} color='#4f4f4f' />
              </InputRightElement>
              <Input ref={messageInput} onChange={(event)=>setNewMessage(event.target.value)} borderRadius="full" type='tel' color={'#4f4f4f'} placeholder='Your message' />
          </InputGroup>
      </div>
    </div>
  )
}
