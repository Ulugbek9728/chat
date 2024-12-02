import "./loading.css"
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useTranslation} from "react-i18next";


function Loading({onCancel}) {

    const navigate = useNavigate();
    const [loadingText, setLoadingText] = useState(false)
    const {t} = useTranslation();

    setTimeout(() => {
        setLoadingText(true)
    }, 5000)

    return (
        <div className='mt-20 lg:mt-32'>
            <div className="loader bg-lightLoading dark:bg-darkLoading">
                <div className="inner_loader bg-amber dark:bg-white"></div>
            </div>
            <p className="text-black dark:text-white text-center mt-3 ">{t("loding.lodingText")}...</p>
            {
                loadingText ? <div className="flex flex-col mt-20 ">
                    <p className="px-8 text-center">{t("loding.StopChat")}</p>
                    <button className="text-lg text-white Partner bg-bluee px-9 py-2.5 my-20 mx-auto"
                            onClick={()=>{
                                navigate("/")
                                onCancel();

                            }}
                    >
                        {t("loding.StopButton")}
                    </button>
                </div>: ''
            }

        </div>
    );
}

export default Loading;