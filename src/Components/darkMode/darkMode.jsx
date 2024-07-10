import {useEffect, useState} from "react";


function DarkMode() {
    const [theme, setTheme]=useState(localStorage.getItem('theme') ? localStorage.getItem('theme') :'system')
    const element = document.documentElement
    const darkQuery =window.matchMedia("prefers-color-scheme: dark")

    const options = [
        {
            icon: 'sunny-outline',
            text:'light'
        },
        {
            icon: 'moon-outline',
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
        <div className='bg-sky-800 rounded-lg '>
            {
                options?.map(opt=>(
                    <button key={opt.text} className={`w-8 h-8 mx-3 leading-9 text-xl rounded-full m-1 text-white ${
                        theme===opt.text && "text-yellow-500"}`}
                            onClick={()=>setTheme(opt.text)}
                    >
                        <ion-icon name={opt.icon}/>
                    </button>
                ))
            }

        </div>
    );
}

export default DarkMode;