import React, { useContext, useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import ChatHeader from './ChatHeader';
import Loading from './Loading';
import ChatContent from './ChatContent';
import { Heading } from '@chakra-ui/react';
import SocketContext from '../context/socket';

export default function Chat() {

  const global = useContext(SocketContext)
  const {roomId} = global

  useEffect(() => {

    if(!roomId) return
    global.setIsLoading(true)
    const token = localStorage.getItem('jwtToken')

    let controller = new AbortController();
    let signal = controller.signal
    
    fetch(`http://localhost:4000/qchat/${roomId}`,{
      signal,
      method:'GET',
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(response => {
       global.setChatData(response.data)
    }).catch(error => {
      if (controller.signal.aborted) {
        console.log('Request was aborted.');
      }
    })
    .finally(()=>{
      global.setIsLoading(false)
    })

    return () => {
      controller.abort();
    };

  },[roomId])

  return (
    <div id='Chat'>
      {global.isLoading ? <Loading /> : <ChatContent/>}
    </div>
  )
}
