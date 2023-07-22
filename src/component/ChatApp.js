import React, { useEffect, useState, useContext } from 'react'
import Header from './Header'
import Main from './Main'
import SocketProvider from '../provider/SocketProvider'
import SocketContext from '../context/socket'

export default function ChatApp() {

  const socket = useContext(SocketContext)

  const [Chats,setChats] = useState([])

  const [chatData,setChatData] = useState([])
  const [chatBuffer,setChatBuffer] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const [selfId,setSelfId] = useState('')
  const [selfName,setSelfName] = useState('')
  const [selfEmail,setSelfEmail ] = useState('')

  const [roomId, setRoomId] = useState('')
  const [roomName,setRoomName] = useState('')
  const [profilePictures,setProfilePicture] = useState('')

  const [SearchResult,setSearchResult] = useState([])
  const [Seacrh, setSearch] = useState('')

  socket.on('message',(data) => {
    let isYou;
    if(data.userid === selfId) {
      isYou = true
    } else {
      isYou = false
    }
    const newMessage = {
      id: data.id,
      message: data.message,
      isYou: isYou,
      sender: data.username
    }
    isLoading ? 
    setChatBuffer(() => chatBuffer ? [...chatBuffer, newMessage] : [newMessage]) : 
    setChatData(() => chatData ? [...chatData, newMessage] : [newMessage] );
  }) 

  useEffect(() => {

    const fetchDataAndConnectSocket = async () => {
      const token = localStorage.getItem('jwtToken')
      await fetch('http://localhost:4000/info',{
      method:'GET',
      headers:{
        Authorization: `Bearer ${token}`
      }
      })
      .then(response => response.json())
      .then(data => {
        if(data.msg === 'success'){
          setSelfEmail(data.data.email)
          setSelfId(data.data.userid)
          setSelfName(data.data.username)
        }
      })
      .catch(err => console.log('Error fetching user info'))
    }
    fetchDataAndConnectSocket()
    socket.connect() 
  },[])

  let value = {
    socket,
    data:{
      selfEmail,
      selfId,
      selfName
    },
    roomId,
    setRoomId,
    roomName,
    setRoomName,
    profilePictures,
    setProfilePicture,
    chatData,
    setChatData,
    isLoading,
    setIsLoading,
    chatBuffer,
    setChatBuffer,
    Chats,
    setChats,
    Seacrh,
    setSearch,
    SearchResult,
    setSearchResult
  }

  return (
    <SocketContext.Provider value={value}>
      <div id='ChatApp'>
        <Header/>
        <Main/>
      </div>
    </SocketContext.Provider>
  )
}
