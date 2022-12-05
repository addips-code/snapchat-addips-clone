import { StopRounded } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactTimeago from 'react-timeago';
import "./Chat.css";
import { selectImage } from "./features/appSlice";
import { db } from './firebase';


function Chat({ id, username, timestamp, profilePic, read, imageUrl}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            db.collection("posts").doc(id).set(
            {
                read: true,
            }, 
                { merge: true }
            );
            navigate('/chats/view');
        }
    };
  return (
    <div onClick={open} className='Chat'>
        <Avatar src={profilePic} className='chat_avatar' />
        <div className="chat_info">
            <h4>{username}</h4>
            <p>Tap to view - <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
        </div>

        {!read && <StopRounded className='chat_readIcon'/>}
    </div>
  );
}

export default Chat