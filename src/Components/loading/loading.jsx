import "./loading.css"
import {useNavigate} from "react-router-dom";
import {useState} from "react";


function Loading({onCancel}) {

    const navigate = useNavigate();
    const [loadingText, setLoadingText] = useState(false)

    setTimeout(() => {
        setLoadingText(true)
    }, 5000)

    return (
        <div className='mt-32'>
            <div className="loader">
                <div className="inner_loader"></div>
            </div>
            <p className="text-black text-center mt-3 ">Ищем свободного собеседника...</p>
            {
                loadingText ? <div className="flex flex-col mt-20 ">
                    <p className="px-8 text-center">Поиск может занять много времени, поскольку нет пользователей, соответствующих запросу.</p>
                    <button className="text-lg text-white Partner bg-bluee px-9 py-2.5 my-20 mx-auto"
                            onClick={()=>{
                                onCancel();
                                navigate("/")
                            }}
                    >
                        Остановить поиск
                    </button>
                </div>: ''
            }

        </div>
    );
}

export default Loading;