import { ChatBubble, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import "./Chats.css";
import Chat from "./Chat";
import { db } from './firebase';

function Chats() {
    const [post, setPosts] = useState([]);

    useEffect(() => {
        db.collection('post').orderBy('timestamp', 'desc').onSnapshot(snapshot => setPosts(snapshot.docs.map(doc =>({
            id: doc.id,
            data: doc.data(),
        }))))
    }, [])

  return (
    <div className='Chats'>
        <div className="chats_header">
            <Avatar className='chats_Avatar'/>
            <div className="chats_search">
                <Search />
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
    </div>
  )
}

export default Chats