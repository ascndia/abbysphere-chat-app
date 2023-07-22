import { SettingsIcon } from '@chakra-ui/icons'
import { Heading, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import React, { useContext } from 'react'
import SocketContext from '../context/socket'

export default function ChatHeader() {

  const global = useContext(SocketContext)
  const {roomName} = global

  return (
    <div id='ChatHeader'>
      <div className='ChatName'>{roomName}</div>
      <div className='ChatSetting cp'>
        <Menu>
          <MenuButton
            as={SettingsIcon}
            aria-label='Options'
            color={'grey'} 
            icon={<SettingsIcon/>}
            variant='outline'
            w={5}
            h={5}
          />
          <MenuList>
            <MenuItem>
              Group Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              Add User
            </MenuItem>
            <MenuItem>
              Join Request
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              Setting
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  )
}
