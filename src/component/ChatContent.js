import React, { useContext, useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatList from './ChatList'
import Loading from './Loading'
import { Heading } from '@chakra-ui/react'
import SocketContext from '../context/socket'

export default function ChatContent() {
    
    const global = useContext(SocketContext)
    const [hasId, setHasId] = useState(global.roomId ? false : true);

    return (
        <div id='ChatContent'>
            {hasId ? 
                <>
                    <Heading size={'xl'} color={'white'}>Choose a chat</Heading>
                </>
                : 
                <>
                    <ChatHeader />
                    <ChatList />
                </>
            }
        </div>
    )
}
