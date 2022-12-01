// import React from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import { BrowserRouter as Router, Switch, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Preview from './Preview';


const router = createBrowserRouter([{
  path: "/",
  element: <WebcamCapture />,
  children: [
    {
      path: "preview",
      element: <Preview />,
    },
  ],
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
