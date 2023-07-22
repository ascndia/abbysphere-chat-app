import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Button, Heading } from '@chakra-ui/react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

export default function Login() {

    const navigate = useNavigate()
    const [show, setShow] = React.useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const handleClick = () => setShow(!show)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const Login = async() => {
        const body = {
            email:email,
            password:password
        }
        const bodyjson = JSON.stringify(body)
        try {
            fetch('http://localhost:4000/login',
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: bodyjson
            })
            .then(response => response.json())
            .then(data => {
                const { token, detail } = data
                if(detail == "wrong password"){
                    setAlertMsg("wrong password")
                    setShowAlert(true)
                } else if(detail == "invalid request"){
                    setAlertMsg("invalid input")
                    setShowAlert(true)
                } else if(detail == "user not exist"){
                    setAlertMsg("user does not exist")
                    setShowAlert(true)
                }
                if(!token){
                    return
                }
                setAlertMsg("")
                setShowAlert(false)
                localStorage.setItem('jwtToken',token)
                navigate('/')
            })
            .catch(err => console.log(err))
        } catch(err) {
            console.log(err)
        }
    }

    const toRegister = () => {
        navigate('/Register')
    }
    return (
        <>
        <div id='bg'/>
        <div id='container'>
            <Stack spacing={5}>
                {
                    showAlert && (
                        <Alert status="error">
                            <AlertIcon />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {alertMsg}
                            </AlertDescription>
                        </Alert>
                    )
                }
                <Heading zIndex={1} as='h2' size='lg'>
                    Login
                </Heading>
                <Input onChange={handleEmailChange} type='email' placeholder='email' size='md' />
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        onChange={handlePasswordChange}
                        placeholder='Enter password'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Button onClick={Login} colorScheme='teal' size='md'>
                    Login
                </Button> 
                <Button onClick={toRegister} variant='outline' colorScheme='teal' size='md'>
                    dont have account yet ? Sign up
                </Button> 
            </Stack>
        </div>
        </>
    )
}
