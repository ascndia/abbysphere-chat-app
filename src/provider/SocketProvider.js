import React from 'react';
import SocketContext from '../context/socket';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
    )
    
};

export default SocketProvider;