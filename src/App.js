// import React from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import { BrowserRouter as Router, Switch, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Preview from './Preview';
import Chats from './Chats';
import Login from './Login';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, login } from './features/appSlice';
import { useEffect } from 'react';
import { auth } from './firebase';

const router = createBrowserRouter([
  {
    path: "/",
    element: <WebcamCapture/>,
  },
  {
    path: "/preview",
    element: <Preview />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
  {
    path: "/chats/view",
    element: <ChatView />,
  },
]);


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser){
        dispatch(login({
          username: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid
        }))
      }else{
        dispatch(logout())
      }
    })
  }, [])
  
  return (
    <div className="App">
      {!user ? (
        <Login />
      ):(
        <>
        <img className='app_logo' src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg" alt="" />
        <div className='app_body'>
          <div className="app_bodyBackground">
                  <RouterProvider router={router} />
          </div>
      </div>
      </>
      )}
    </div>
  );
}

export default App;
