import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom'
import App, {loader as appLoader } from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css' //aqui cargamos bootstrap

const router = createBrowserRouter([{
  path:'/',
  element: <App />,
  loader: appLoader,
  children:[

  ]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
