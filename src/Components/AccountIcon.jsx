import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Alert, AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GoogleButton from 'react-google-button';
import {signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../Context/AlertContext';
const useStyles = makeStyles(()=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 400,
        textAlign: 'center'
    }
}))


const AccountIcon = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [user] = useAuthState(auth);
    const {setAlert} = useAlert();
    console.log("user", user);
    const handleClose = ()=>{
        setOpen(false);
    }

    const handleValueChange = (e,v)=>{
        setValue(v);
    }  

    const navigate = useNavigate();

    const handleOpen = ()=>{
        if(user){
            //routing because user is logged in;
            navigate('/user');
        }
        else{
            //no user, so open login/signup form
            setOpen(true);
        }
    }

    const logout = ()=>{
        auth.signOut().then((response)=>{
            setAlert({
                open: true,
                type: 'success',
                message: 'logged out'
            });
        }).catch((err)=>{
            console.log(err);
            setAlert({
                open: true,
                type: 'error',
                message: 'not able to logout'
            });
        });
    }

    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = ()=>{
        
        signInWithPopup(auth,googleProvider).then((response)=>{
            setAlert({
                open: true,
                type: 'success',
                message: 'login successful'
            });
            handleClose();
        }).catch((err)=>{
            setAlert({
                open: true,
                type: 'error',
                message: 'google auth is not working'
            });
        });
    }

    const githubProvider = new GithubAuthProvider();
    const signInWithGithub = ()=>{
        signInWithPopup(auth, githubProvider).then((response)=>{
            setAlert({
                open: true,
                type: 'success',
                message: 'login successful'
            });
        }).catch((err)=>{
            console.log("err",err);
            setAlert({
                open: true,
                type: 'error',
                message: 'github auth is not working'
            });
        });
    }

    const classes = useStyles();
    console.log(classes);
    console.log(value);
    
  return (
    <div>
        <AccountCircleIcon onClick={handleOpen}/>
        {(user) && <LogoutIcon onClick={logout}/>}

        <Modal 
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.box}>
                <AppBar position='static'
                    style={{backgroundColor:'transparent'}}>
                    <Tabs
                        value={value}
                        onChange={handleValueChange}
                        variant='fullWidth'
                    >
                        <Tab label='login'></Tab>
                        <Tab label='signup'></Tab>
                    </Tabs>
                </AppBar>
                {value===0 && <LoginForm handleClose={handleClose}/>}
                {value===1 && <SignupForm handleClose={handleClose}/>}

                <Box>
                    <span>OR</span>
                    <GoogleButton
                        style={{width:'100%',marginTop:'8px'}}
                        onClick={signInWithGoogle}
                    />
                </Box>
                <Box>
                    <span>OR</span>
                    <div className='github-button' onClick={signInWithGithub}>
                        Login with Github
                    </div>
                </Box>
            </div>
        </Modal>
    </div>
  )
}

export default AccountIcon