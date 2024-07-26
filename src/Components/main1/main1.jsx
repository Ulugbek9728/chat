import "./main1.scss"
import {style} from "@/utils/style.js";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Flex, Radio} from 'antd';
import axios from "axios";
import {domen} from "../../domen.jsx"
import DarkMode from "../darkMode/darkMode.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


function Main1() {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [fulInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [ChatFilter] = useState(JSON.parse(localStorage.getItem("ChatFilter")));
    const [filtrUser, setFiltrUser] = useState({
        topic: ChatFilter?.topic,
        gender: ChatFilter?.gender,
        partnerGender: ChatFilter?.partnerGender,
        age: ChatFilter?.age,
        partnerAges: ChatFilter?.partnerAges
    })
    const [srcUserAge, setSrcUserAge] = useState([
            {
                age: `TO_17`,
                value: "TO_17",
                type: '',
            },
            {
                age: `FROM_18_TO_22`,
                value: "FROM_18_TO_22",
                type: '',
            },
            {
                age: `FROM_22_TO_25`,
                value: "FROM_22_TO_25",
                type: "",
            },
            {
                age: `FROM_26_TO_35`,
                value: "FROM_26_TO_35",
                type: "",
            },
            {
                age: `FROM_36`,
                value: "FROM_36",
                type: "",
            }
        ].map(item => {
            if (filtrUser?.partnerAges?.filter(i => i === item.value).length > 0) return {...item, type: 'ACTIVE'};
            return item;
        })
    )
    const [message, setMessage] = useState('');
    const [sucsessText, setSucsessText] = useState('');
    const [disablet, setDisablet] = useState(false)

    function srcAge(e, age) {
        setSrcUserAge(prevValue =>
            prevValue.map(user =>
                user.age === age ?
                    user.type === e ? {...user, type: ''} : {...user, type: 'ACTIVE'} : user
            ))
    }

    function chatNow() {
        localStorage.removeItem("currentChat")
        const userAgeSrc = srcUserAge.filter((item) => item.type === "ACTIVE").map(item => item.value)
        const userAllFilter = {
            ...filtrUser,
            partnerAges: filtrUser.gender === 'Некто' ? {} : userAgeSrc
        }
        if (fulInfo === null && userAllFilter.age!==undefined && userAllFilter.gender!==undefined && userAllFilter.partnerGender!==undefined) {

            axios.post(`${domen}/api/v1/auth/register`, userAllFilter).then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("ChatFilter", JSON.stringify(userAllFilter))
                navigate("/chat");
            }).catch((error) => {
                console.log(error)
                setMessage(error.message)
            })
        } else {
            console.log(userAllFilter)
            console.log(filtrUser)
            navigate("/chat")

            localStorage.setItem("ChatFilter", JSON.stringify(userAllFilter))

        }
    }

    useEffect(() => {
        srcAge()
    }, [filtrUser.topic]);

    useEffect(() => {
        if (filtrUser.gender === "Некто") {
            setDisablet(true);
            setFiltrUser({
                ...filtrUser,
                partnerAges: {},
                partnerGender: 'Не важно'
            })
        } else setDisablet(false);

    }, [filtrUser.gender, filtrUser.topic]);

    useEffect(() => {
        setMessage('')
        setSucsessText('')
        notify();
    }, [message, sucsessText,]);

    function notify() {
        if (sucsessText !== '') {
            toast.success(sucsessText)
        }
        if (message !== '') {
            toast.error(message)
        }
    }

    return (
        <div className='main mt-8'>
            <div className={`${style.container}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-16 pb-40">
                    <div className='p-3'>
                        <p className={`text-bluee dark:text-white text-2xl md:text-4xl font-bold uppercase`}>
                            find friend youre life
                        </p>
                        <div
                            className=" dark:bg-darkBlue2 w-full bg-blue-50 rounded-3xl shadow-lg shadow-bluee  mt-10 p-5">
                            <div className="flex gap-2">
                                <DarkMode/>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                                <div className="w-full">
                                    <p className='text-black dark:text-white'>Ваш пол:</p>
                                    <Flex vertical gap="middle">
                                        <Radio.Group buttonStyle="solid" className='h-11'
                                                     value={filtrUser.gender}
                                                     onChange={(e) => {
                                                         setFiltrUser({
                                                             ...filtrUser,
                                                             gender: e.target.value,
                                                             age: e.target.value === "Некто" ? '' : filtrUser.age
                                                         })
                                                     }}>

                                            <Radio.Button className='bg-bluee text-white h-full w-24 pt-1.5'
                                                          value="DOES_NOT_HAVE">Некто</Radio.Button>
                                            <Radio.Button
                                                className='bg-bluee text-white h-full w-16 md:w-16 xl:w-20 pt-1.5'
                                                value="MALE">M</Radio.Button>
                                            <Radio.Button
                                                className='bg-bluee text-white h-full w-16 md:w-16 xl:w-20 pt-1.5'
                                                value="FEMALE ">Ж</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                                <div className="w-full">
                                    <p className='text-black dark:text-white'>Пол собеседника:</p>
                                    <Flex vertical gap="middle">
                                        <Radio.Group buttonStyle="solid" className='h-11 dark:border-white'
                                                     value={filtrUser.partnerGender}
                                                     onChange={(e) => {
                                                         setFiltrUser({
                                                             ...filtrUser,
                                                             partnerGender: e.target.value
                                                         })
                                                     }}>
                                            <Radio.Button className='bg-bluee text-white h-full w-24 pt-1.5'
                                                          value="DOES_NOT_HAVE">Не важно</Radio.Button>
                                            <Radio.Button disabled={disablet}
                                                          className={`bg-bluee text-white h-full w-16 md:w-16 xl:w-20 pt-1.5`}
                                                          value="MALE">M</Radio.Button>
                                            <Radio.Button disabled={disablet}
                                                          className='bg-bluee text-white h-full w-16 md:w-16 xl:w-20 pt-1.5'
                                                          value="FEMALE ">Ж</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 2sm:grid-cols-2 gap-4 mt-3">
                                {
                                    disablet ? '' : <div className="flex flex-col gap-2">

                                        <p className='text-black dark:text-white'>Ваш возраст:</p>

                                        <Flex gap="middle">
                                            <Radio.Group className=''
                                                buttonStyle="solid"
                                                onChange={(e) => {
                                                    setFiltrUser({...filtrUser, age: e.target.value})
                                                }}
                                                style={{cursor: disablet ? 'not-allowed' : ''}}
                                                disabled={disablet}
                                                value={filtrUser.age}
                                            >
                                                {
                                                    srcUserAge.map((item, index) => {
                                                            return (
                                                                <Radio.Button className={`bg-bluee mt-2 rounded-lg w-full text-white h-11 pt-1.5`}
                                                                              key={index} value={item.value}>
                                                                    {t(`Home.${item.age}`)}
                                                                </Radio.Button>
                                                            )
                                                        }
                                                    )
                                                }
                                            </Radio.Group>
                                        </Flex>

                                    </div>
                                }
                                {
                                    disablet ? '' : <div className="flex flex-col gap-2">
                                        <p className='mb-1.5 text-black dark:text-white'>Возраст собеседника:</p>

                                        {
                                            srcUserAge.map((item, index) =>
                                                <button
                                                    key={index}
                                                    className={`border bg-bluee rounded-lg mt-0.4 w-full text-white h-11 ${item.type} text-sm`}
                                                    onClick={() => srcAge("ACTIVE", item.age)}>
                                                    {t(`Home.${item.age}`)}
                                                </button>
                                            )
                                        }
                                    </div>
                                }

                            </div>
                            <div className="flex justify-center">
                                <button className='text-lg text-white bg-bluee Partner mt-10 mb-5 px-9 py-2.5 my-20'
                                        onClick={() => {
                                            chatNow()
                                        }}>
                                    Начать чат
                                </button>

                            </div>

                        </div>
                    </div>
                    <img className="aim mt-32 hidden lg:block" src="./img/aim2.svg" alt=""/>
                </div>

            </div>

        </div>
    );
}

export default Main1;