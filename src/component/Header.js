import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heading, Icon } from '@chakra-ui/react'
import { HamburgerIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import SocketContext from '../context/socket'

export default function Header(props) {

  const navigate = useNavigate()
  const global = useContext(SocketContext)
  const Logout = () => {
    global.socket.disconnect()
    localStorage.removeItem('jwtToken')
    navigate('/Login')
    return
  }
  
  return (
    <div id='Header'>
      <div className='left'>
        <Heading className='cp'>Abbysphere</Heading>
      </div>
      <div className='right'>
        <Menu>
          <MenuButton
            as={HamburgerIcon}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            w={8} h={8}
            className='cp'
          />
          <MenuList>
            <MenuItem>
              Profile
            </MenuItem>
            <MenuItem>
              Account
            </MenuItem>
            <MenuDivider/>
            <MenuItem>
              Setting
            </MenuItem>
            <MenuItem onClick={Logout}>
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  )
}
