import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig';
import { useAlert } from '../Context/AlertContext';
import { themeOptions } from '../Utils/theme';
import { useTheme } from '../Context/ThemeContext';
import errorMapping from '../Utils/errorMapping';

const LoginForm = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setAlert} = useAlert();
    const {theme} = useTheme();
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
                message: errorMapping[err.code] || "Some error occured"
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
            InputLabelProps={{
                style: {
                    color: theme.title
                }
            }}
            InputProps={{
                style: {
                    color: theme.title
                }
            }}
            onChange={(e)=>setEmail(e.target.value)}/>
        <TextField
            type='password'
            variant='outlined'
            label='Enter Password'
            InputLabelProps={{
                style: {
                    color: theme.title
                }
            }}
            InputProps={{
                style: {
                    color: theme.title
                }
            }}
            onChange={(e)=>setPassword(e.target.value)}/>
        <Button
            variant='contained'
            size='large'
            style={{backgroundColor: theme.title, color: theme.background}}
            onClick={handleSubmit}>
                LOGIN
        </Button>

    </Box>
  )
}

export default LoginForm