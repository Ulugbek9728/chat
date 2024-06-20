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

const router=createBrowserRouter([
    {
        path: "/",
        element: (<App/>),
        errorElement:<PageNotFound/>,
        children:[

        ]
    },
    // {
    //     path: "team",
    //     element: <Team/>,
    // },
    // {
    //     path: "projects",
    //     element: <Project/>,
    // },

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
