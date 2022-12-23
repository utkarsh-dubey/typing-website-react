import React from 'react'
import { useAlert } from '../Context/AlertContext'
import { Alert, Slide, Snackbar } from '@mui/material';

const Alert2 = () => {
    const {alert, setAlert} = useAlert();

    const handleClose = (event, reason)=>{

        if(reason === 'clickaway'){
            return;
        }
        setAlert({
            open: false,
            type: '',
            message: ''
        });
    }
  return (
    <div>   
        <Snackbar
            open={alert.open} 
            autoHideDuration={2000} 
            onClose={handleClose}
            anchorOrigin={
                {
                    vertical: 'top',
                    horizontal: 'right'
                }
            }
           >    
           <Slide in={alert.open}>    
                <Alert severity={alert.type} onClose={handleClose}>
                        {alert.message}
                </Alert>
           </Slide>
        </Snackbar>
    </div>
  )
}

export default Alert2