import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./main.css"
import PageNotFound from "./Components/PageNotFound.jsx";
import "./utils/i18n";
import Chat from "@/Components/chat/chat.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Login from "@/Components/login/login.jsx";
import AdminAll from "@/admin/adminAll.jsx";




const router=createBrowserRouter([
    {
        path: "/",
        element: (<App/>),
        errorElement:<PageNotFound/>,
        children:[
        ]
    },
    {
        path: "chat",
        element: <Chat/>,
    },
    {
        path: "login_chat_admin",
        element: <Login/>,
    },
    {
        path: "adminG-lam",
        element: <AdminAll/>,
    },



])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ToastContainer/>

      <RouterProvider router={router}/>
  </React.StrictMode>,
)
