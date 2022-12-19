import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tab, Tabs } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const useStyles = makeStyles(()=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 400
    }
}))


const AccountIcon = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    
    const handleClose = ()=>{
        setOpen(false);
    }

    const handleValueChange = (e,v)=>{
        setValue(v);
    }  

    const handleOpen = ()=>{
        setOpen(true);
    }

    const classes = useStyles();
    console.log(classes);
    console.log(value);
    
  return (
    <div>
        <AccountCircleIcon onClick={handleOpen}/>

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
                {value===0 && <LoginForm/>}
                {value===1 && <SignupForm/>}
            </div>
        </Modal>
    </div>
  )
}

export default AccountIcon