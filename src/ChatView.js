import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ChatView.css';
import { selectSelectedImage } from './features/appSlice';

function ChatView() {
    const selectedImage = useSelector(selectSelectedImage);
    const navigate = useNavigate(); 

    useEffect(() => {
        if(!selectedImage){
            exit();
        }
    }, [selectedImage])

    const exit = () => {
        navigate('/chats')
    }
  return (
    <div className='chatview'>
        <img src={selectedImage} onClick={exit} alt="" />
    </div>
  )
}

export default ChatView