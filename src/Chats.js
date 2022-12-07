import { ChatBubble, RadioButtonUnchecked, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import "./Chats.css";
import Chat from "./Chat";
import { db } from './firebase';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { useNavigate } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Chats() {
    const [post, setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        db.collection('post').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setPosts(snapshot.docs.map((doc) =>({
            id: doc.id,
            data: doc.data(),
        }))));
    }, [])

    const takeSnap = () => {
        dispatch(resetCameraImage());
        navigate('/');
    }

  return (
    <div className='Chats'>
        <div className="chats_header">
            <Avatar src={user.profilePic} onClick={() => auth.signOut()} className='chats_Avatar'/>
            <div className="chats_search">
                <Search className='search_icon'/>
                <input type="text" placeholder='Friends' />
            </div>
            <ChatBubble  className='chats_chatIcon'/>
        </div>

        <div className="chat_post">
            {post.map(({id, data: { profilePic, username, timestamp, imageUrl, read}}) => (
                <Chat
                    key={id}
                    id={id}
                    username={username}
                    imageUrl={imageUrl}
                    timestamp={timestamp}
                    profilePic={profilePic}
                    read={read}
                />
            ))}
        </div>
         
        <RadioButtonUnchecked
            className='chats_takePicIcon'
            onClick={takeSnap}
            fontSize='large'
        />
    </div>
  )
}

export default Chats