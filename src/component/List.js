import React, { useState, useEffect, useRef, useContext } from 'react'
import { Input, InputGroup, InputLeftElement, Spacer, Stack } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import ListRoom from './ListRoom'
import SocketContext from '../context/socket'
import { debounce } from 'lodash'
import ListSearch from './ListSearch'

export default function List() {

  const global = useContext(SocketContext)
  const SearchInputRef = useRef(null)

  // fetch chats from another user and group on load
  useEffect(()=>{
    const token = localStorage.getItem('jwtToken')
    fetch('http://localhost:4000/qroom',{
      method:'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(response => {
      const { detail, data } = response;
      if(detail !== "success"){
        console.log('error fetching')
        return
      }
      global.setChats(data)
    })
  },[])


  
  const RenderedSearch = global.SearchResult.map(user => (
    <ListSearch {...user} key={user._id} className='cp' />
  ))
  const RenderedChats = global.Chats.map(Chat => (
    <ListRoom {...Chat} key={Chat.roomId} className='cp'/>
  ))

  function makeApiRequest(event){
    if(event.target.value == '') return
    const token = localStorage.getItem('jwtToken')
    fetch(`http://localhost:4000/user/${event.target.value}`,{
      method:'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json())
    .then(data => {
      if(data.detail === 'success'){
        global.setSearchResult(data.users)
      } else {
        global.setSearchResult([])
      }
    })
  }

  return (
    <div id='List'>
        <div id='Search'>
          <InputGroup>
            <InputLeftElement pointerEvents='pointer'>
              <SearchIcon color='#4f4f4f' />
            </InputLeftElement>
            <Input ref={SearchInputRef} focusBorderColor='none' border={'none'} background={'white'} onChange={debounce(makeApiRequest,1000)} borderRadius="full" type='tel' color={'#4f4f4f'} placeholder='Search' />
          </InputGroup>
        </div>
        <div id='RoomList'>
              {
                global.SearchResult.length !== 0 && (
                  <Stack overflow={'hidden'} rounded={'16px'} background={'white'} spacing={2} marginBottom={4} >
                    {RenderedSearch}
                  </Stack>
                )
              }
              <Stack overflow={'hidden'} rounded={'16px'} background={'white'} spacing={2} >
                {RenderedChats}
              </Stack>
        </div>
    </div>
  )
}
