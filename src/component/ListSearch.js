import React, { useContext } from 'react'
import { Heading, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { color } from 'framer-motion'
import SocketContext from '../context/socket'
import { TriangleDownIcon } from '@chakra-ui/icons'

export default function ListSearch(props) {
    global = useContext(SocketContext)
    const { roomId, username, latestMessage, ProfilePirctures} = props
  return (
    <div className='Chats cp' onClick={() => {

    }}>
        <div className='ProfilePictures'></div>
        <div className='ChatsPreview'>
            <Heading size={'sm'}>{username}</Heading>
            <p style={{'color':'grey'}}>Abbyspehere user</p>
        </div> 
        
        <Menu>
          <MenuButton 
            className={'ic-right'}
            as={TriangleDownIcon}
            aria-label='Options'
            color={'grey'} 
            icon={<TriangleDownIcon/>}
            variant='outline'
            w={5}
            h={5}
          />
          <MenuList>
            <MenuItem>
              Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              Chats
            </MenuItem>
          </MenuList>
        </Menu>
    </div>
  )
}
