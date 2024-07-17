import "./main1.scss"
import {style} from "@/utils/style.js";
import {useNavigate} from "react-router-dom";

import {Flex, Radio} from 'antd';
import axios from "axios";
import {domen} from "../../domen.jsx"
import DarkMode from "../darkMode/darkMode.jsx";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";


function Main1() {
    const navigate = useNavigate();
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
                age: "до 17 лет",
                value: "TO_17",
                type: '',
            },
            {
                age: "от 18 до 21 года",
                value: "FROM_18_TO_22",
                type: '',
            },
            {
                age: "от 22 до 25 года",
                value: "FROM_22_TO_25",
                type: "",
            },
            {
                age: "от 26 до 35 года",
                value: "FROM_26_TO_35",
                type: "",
            },
            {
                age: "старше 36 лет",
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
        if (fulInfo === null) {
            axios.post(`${domen}/api/v1/auth/register`, userAllFilter).then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("ChatFilter", JSON.stringify(userAllFilter))
                navigate("/chat");
            }).catch((error) => {
                console.log(error)
                setMessage(error.message)
            })
        } else {
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
                <div className="grid grid-cols-2 gap-5 xl:gap-16 pb-40">
                    <div className=''>
                        <p className='text-bluee text-4xl font-bold uppercase'>
                            find friend youre life
                        </p>
                        <div className=" dark:bg-primary w-full bg-blue-50 rounded-3xl shadow-lg shadow-bluee  mt-10 p-5">
                            <div className="flex gap-2">
                                <DarkMode/>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="w-full">
                                    <p className='text-black'>Ваш пол:</p>
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
                                            <Radio.Button className='bg-bluee text-white h-full w-20 pt-1.5'
                                                          value="MALE">M</Radio.Button>
                                            <Radio.Button className='bg-bluee text-white h-full w-20 pt-1.5'
                                                          value="FEMALE ">Ж</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                                <div className="w-full">
                                    <p className='text-black'>Пол собеседника:</p>
                                    <Flex vertical gap="middle">
                                        <Radio.Group buttonStyle="solid" className='h-11'
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
                                                          className={`bg-bluee text-white h-full w-20 pt-1.5`}
                                                          value="MALE">M</Radio.Button>
                                            <Radio.Button disabled={disablet}
                                                          className='bg-bluee text-white h-full w-20 pt-1.5'
                                                          value="FEMALE ">Ж</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                {
                                    disablet ? '' : <div className="flex flex-col gap-2">

                                        <p className='text-black'>Ваш возраст:</p>


                                        <Flex gap="middle">
                                            <Radio.Group
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
                                                                <Radio.Button key={index}
                                                                              className={`bg-bluee mt-2 rounded-lg w-full text-white h-11 pt-1.5`}
                                                                              value={item.value}
                                                                >
                                                                    {item?.age}
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
                                        <p className='mb-1.5 text-black'>Возраст собеседника:</p>

                                        {
                                            srcUserAge.map((item, index) =>
                                                <button
                                                    key={index}
                                                    className={`border border-white bg-bluee rounded-lg mt-0.4 w-full text-white h-11  ${item.type}
                                                     text-sm`}
                                                    onClick={() => srcAge("ACTIVE", item.age)}
                                                >
                                                    {item?.age}
                                                </button>
                                            )
                                        }
                                    </div>
                                }

                            </div>
                            <div className="flex justify-center">
                                <button className='text-lg text-white bg-bluee Partner mt-10 mb-5 px-9 py-2.5 my-20'
                                        onClick={() => {chatNow()}}>
                                    Начать чат
                                </button>

                            </div>

                        </div>
                    </div>
                    <img className="aim mt-32" src="./img/aim1.png" alt=""/>
                </div>

            </div>

        </div>
    );
}

export default Main1;