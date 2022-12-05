// import React from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import { BrowserRouter as Router, Switch, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';

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
  return (
    <div className="App">
      <div className='app_body'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
