import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';

const SignupForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {setAlert} = useAlert();
    const handleSubmit = ()=>{
        if(!email || !password || !confirmPassword){
            setAlert({
                open: true,
                type: 'warning',
                message: 'fill all details'
            });
            return;
        }
        if(password!==confirmPassword){
            setAlert({
                open: true,
                type: 'warning',
                message: 'Password Mismatch'
            });
            return
        }
        
        auth.createUserWithEmailAndPassword(email, password).then((response)=>{
            setAlert({
                open: true,
                type: 'success',
                message: 'account created!'
            });
            handleClose();
        }).catch((err)=>{
            console.log("sign up failed",err);
            setAlert({
                open: true,
                type: 'error',
                message: 'not able to create account'
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
        <TextField
            type='password'
            variant='outlined'
            label='Enter Confirm Password'
            onChange={(e)=>setConfirmPassword(e.target.value)}/>
        <Button
            variant='contained'
            size='large'
            onClick={handleSubmit}>
                Signup
        </Button>

    </Box>
  )
}

export default SignupForm