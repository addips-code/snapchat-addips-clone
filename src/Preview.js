import { AttachFile, Close, Create, Crop, MusicNote, Note, Send, TextFields, Timer } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from "uuid";
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import { db, storage } from "./firebase";
import './preview.css'
import firebase from "firebase";
import { selectUser } from './features/appSlice';

function Preview() {
  const cameraImage = useSelector(selectCameraImage)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      navigate("/")
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage()); 
  }

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage.ref(`post/${id}`).putString(cameraImage, 'data_url');

    uploadTask.on('state_changed', null, (error) =>{
      console.log(error);
    }, 
    () => {
      storage.ref("post").child(id).getDownloadURL().then(url => {
        db.collection('post').add({
          imageUrl: url,
          username: user.displayName,
          read: false,
          profilePic: user.profilePic,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        navigate("/chats")
      });
    }
    );
  };

  return (
    <div className='preview'>
      <Close className='preview_close' onClick={closePreview}/>
      <div className="preview_toolbarRight">
        <TextFields/>
        <Create />
        <Note/>
        <MusicNote/>
        <AttachFile/>
        <Crop/>
        <Timer/>
      </div>
      <img src={cameraImage} alt='' />
      <div onClick={sendPost} className="preview_footer">
        <h2>Send Now</h2>
        <Send className='preview_sendIcon' fontSize="small"/>
      </div>
    </div>
  )
}

export default Preview;