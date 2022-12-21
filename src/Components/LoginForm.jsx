import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';

const LoginForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setAlert} = useAlert();

    const handleSubmit = ()=>{
        if(!email || !password){
            setAlert({
                open: true,
                type: 'warning',
                message: 'fill all details'
            });
            return;
        }

        auth.signInWithEmailAndPassword(email,password).then((response)=>{
            setAlert({
                open: true,
                type: 'success',
                message: "logged in"
            });
            handleClose();  
        }).catch((err)=>{
            console.log("error", err);
            setAlert({
                open: true,
                type: 'error',
                message: "not logged in"
            });
        });

    }
  return (
    <Box
        p={3}
        style={{
            display:"flex",
            flexDirection:'column',
            gap:'20px'
        }}
    >
        
        <TextField
            type='email'
            variant='outlined'
            label='Enter Email'
            onChange={(e)=>setEmail(e.target.value)}/>
        <TextField
            type='password'
            variant='outlined'
            label='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}/>
        <Button
            variant='contained'
            size='large'
            onClick={handleSubmit}>
                LOGIN
        </Button>

    </Box>
  )
}

export default LoginForm