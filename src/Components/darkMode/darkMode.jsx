import {useEffect, useState} from "react";
import {SunOutlined, MoonOutlined} from "@ant-design/icons";


function DarkMode() {
    const [theme, setTheme]=useState(localStorage.getItem('theme') ? localStorage.getItem('theme') :'system')
    const element = document.documentElement
    const darkQuery =window.matchMedia("prefers-color-scheme: dark")

    const options = [
        {
            icon: <SunOutlined />,
            text:'light'
        },
        {
            icon: <MoonOutlined />,
            text:'dark'
        },
    ]
    
    function onWindowMatch() {
        if (localStorage.theme==='dark'|| (!("theme" in localStorage) && darkQuery.matches)){
            element.classList.add("dark")
        } else {
            element.classList.remove("dark")
        }
    }
    useEffect(() => {
        switch (theme) {
            case 'dark':
                element.classList.add('dark')
                localStorage.setItem('theme', 'dark')
                break;
            case 'light':
                element.classList.remove('dark')
                localStorage.setItem('theme', 'light')

                break;
            default:
                onWindowMatch()
                break;
        }
    }, [theme]);

    return (
        <div className='bg-bluee rounded-lg '>
            {
                options?.map(opt=>(
                    <button key={opt.text} className={`w-8 h-8 mx-1  2sm:mx-3 2sm:m-1 leading-7 text-xl rounded-full  text-white ${
                        theme===opt.text && "text-yellow-500"}`}
                            style={{outline: "none"}}
                            onClick={()=>setTheme(opt.text)}
                    >
                        {opt.icon}
                    </button>
                ))
            }

        </div>
    );
}

export default DarkMode;