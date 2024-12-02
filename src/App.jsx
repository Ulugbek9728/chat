import "./App.scss"

import Navbar from "./Components/navbar/navbar.jsx";
import Main1 from "./Components/main1/main1.jsx";
import Footer from "./Components/footer/footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {domen} from "./domen.jsx"
import UserBlock from "@/Components/userBlock.jsx";


function App() {
    const [fulInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [UserActive, setUserActive] = useState(false)


    useEffect(() => {
        if (fulInfo !== null) {
            axios.get(`${domen}/user/is-valid`,
                {headers: {"Authorization": `Bearer ${fulInfo?.token}`}}).then((response) => {
                setUserActive(response.data.isUserBlocked)
            }).catch((error) => {
                console.log(error)
            });
        }
    }, [])

    return (
        <div className={`App  dark:bg-darkBlue bg-blue-50 relative`}>
            <Navbar/>

            {UserActive ? <UserBlock/> : <Main1/>}


            <Footer/>
        </div>
    )
}

export default App
