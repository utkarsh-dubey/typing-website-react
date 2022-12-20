import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig';

const LoginForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = ()=>{
        if(!email || !password){
            alert("Fill all the details");
            return;
        }

        auth.signInWithEmailAndPassword(email,password).then((response)=>{
            alert("login successfull");
            handleClose();  
        }).catch((err)=>{
            console.log("error", err);
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