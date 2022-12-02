import React, { useCallback, useRef } from 'react'
import Webcam from 'react-webcam';
import { RadioButtonUnchecked } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import {setCameraImage} from "./features/cameraSlice"
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';


const videoConstraints = {
    width: 250,
    height: 400,
    faceingMode: "user",
};

function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate("/preview")
        // navigate('/preview');

        // eslint-disable-next-line
    }, [webcamRef]);

  return (
    <div className='WebcamCapture'>
        <Webcam 
            audio={false}
            height={videoConstraints.height} 
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={videoConstraints.width}
            videoConstraints={videoConstraints }
        />

        <RadioButtonUnchecked className='webcamCapture_button' onClick={capture} fontSize="large"/>
    </div>
  );
}

export default WebcamCapture;