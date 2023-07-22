import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const AuthHOC = (WrappedComponent) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('jwtToken');
        return !!token
    }

    const AuthenticatedComponent = (props) => {

        const navigate = useNavigate();
        useEffect(()=>{
            if(!isAuthenticated()) {
                
                navigate('/Login')
            }
        },[])

        if(!isAuthenticated()) {
            return null;
        }
        return <WrappedComponent {...props}/>
    }

    return AuthenticatedComponent;
}

export default AuthHOC