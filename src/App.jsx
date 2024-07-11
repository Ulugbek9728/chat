import "./App.scss"

import Navbar from "./Components/navbar/navbar.jsx";
import Main1 from "./Components/main1/main1.jsx";
import Main2 from "./Components/main2/main2.jsx";
import Main3 from "./Components/main3/main3.jsx";
// import Main4 from "./Components/main4/main4.jsx";
// import Main5 from "./Components/main5/main5.jsx";
import Footer from "./Components/footer/footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {domen} from "./domen.jsx"
import UserBlock from "@/Components/userBlock.jsx";



function App() {
    const [fulInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [UserActive, setUserActive] = useState(true)

    console.log(fulInfo)


    useEffect(()=>{
        return()=>{
            axios.get(`${domen}/user/is-valid`,
                {headers: {"Authorization": `Bearer ${fulInfo?.token}`}}).then((response) => {
                console.log(response.data);
                setUserActive(response.data.isUserBlocked)
            }).catch((error) => {
                console.log(error)
            });

        }

    },[])


    return (
        <div className={`App bg-blue-50 dark:bg-slate-500`}>
            <Navbar/>
            {
                UserActive ? <UserBlock/>:<Main1/>
            }
            {/*<Main2/>*/}
            {/*<Main3/>*/}
            {/*<Main4/>*/}
            {/*<Main5/>*/}
            {/*<video src=""></video>*/}
            <Footer/>
        </div>
    )
}

export default App
