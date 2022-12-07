import { Button } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { auth, provider } from './firebase';
import './Login.css';

function Login() {
    const dispatch = useDispatch();
    const signIn = () => {
        auth.signInWithPopup
    };

  return (
    <div className='login'>
        <div className="login_container">
            <img src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
            <Button variant='outlined' onClick={signIn}>Sign in</Button>
        </div>
    </div>
  )
}

export default Login