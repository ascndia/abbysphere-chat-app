import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Input } from "@chakra-ui/react";
import { Button, ButtonGroup, Heading } from '@chakra-ui/react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'

export default function Register() {

    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [alertStatus,setAlertStatus] = useState('')
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMsg, setAlertMsg] = useState('');

    const handleUserNameChange = (event) => setUserName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePassword1Change = (event) => setPassword1(event.target.value);
    const handlePassword2Change = (event) => setPassword2(event.target.value);
    
    const Register = async () => {
        const body = {
            username:username,
            email:email,
            password:password1,
            confirmpassword:password2
        }

        const bodyjson = JSON.stringify(body)
        try {
            fetch('http://localhost:4000/register',
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: bodyjson
            })
            .then(response => response.json())
            .then(data => {
                const { detail } = data
                if(detail == "password not match"){
                    setAlertTitle('Error')
                    setAlertStatus('error')
                    setAlertMsg("password dont match")
                    setShowAlert(true)
                } else if(detail == "email already exist"){
                    setAlertTitle('Error')
                    setAlertStatus('error')
                    setAlertMsg("email already in use")
                    setShowAlert(true)
                } else if(detail == "invalid request"){
                    setAlertTitle('Error')
                    setAlertStatus('error')
                    setAlertMsg("invalid input")
                    setShowAlert(true)
                } else if(detail == "success") {
                    setAlertTitle('Success')
                    setAlertStatus('success')
                    setAlertMsg("Successfully created")
                    setShowAlert(true)
                }
                
            })
            .catch(err => console.log(err))
        } catch(err) {
            console.log(err)
        }
    }

    const navigate = useNavigate()
    const toLogin = () => {
        navigate('/Login')
    }
    return (
        <>
            <div id='bg' />
            <div id='container'>
                <Stack spacing={5}>
                    {
                        showAlert && (
                            <Alert status={alertStatus}>
                                <AlertIcon />
                                <AlertTitle>{alertTitle}</AlertTitle>
                                <AlertDescription>
                                    {alertMsg}
                                </AlertDescription>
                            </Alert>
                        )
                    }
                    <Heading zIndex={1} as='h2' size='lg'>
                        Register
                    </Heading>
                    <Input onChange={handleUserNameChange} type='text' placeholder='username' size='md' />
                    <Input onChange={handleEmailChange} type='email' placeholder='email' size='md' />
                    <Input onChange={handlePassword1Change} type='password' placeholder='password' size='md' />
                    <Input onChange={handlePassword2Change} type='password' placeholder='confirm password' size='md' />
                    <Button onClick={Register} colorScheme='teal' size='md'>
                        Register
                    </Button> 
                    <Button onClick={toLogin} variant='outline' colorScheme='teal' size='md'>
                        already have an account? Sign in
                    </Button> 
                </Stack>
            </div>
        </>
    )
}
