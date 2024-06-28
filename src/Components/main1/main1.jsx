import "./main1.scss"
import {style} from "../../utils/style.js";
import { useNavigate } from "react-router-dom";

import {Flex, Radio} from 'antd';
import axios from "axios";
import {domen} from "../../domen.jsx"
import DarkMode from "../darkMode/darkMode.jsx";
import {useEffect, useState} from "react";

function Main1() {
    const navigate = useNavigate();

    const [filtrUser, setFiltrUser] = useState({
        topic: 'Oбшение',
        gender: '',
        partnerGender: '',
        age: '',
        parametr: "",
        partnerAges: {}
    })
    const [srcUserAge, setSrcUserAge] = useState([
        {
            age: "до 17 лет",
            type: "",
            topic: ['Oбшение',]
        },
        {
            age: "от 18 до 21 года",
            type: "",
            topic: ['Oбшение', 'Флирт 18+',]
        },
        {
            age: "от 22 до 25 года",
            type: "",
            topic: ['Oбшение', 'Флирт 18+',]
        },
        {
            age: "от 26 до 35 года",
            type: "",
            topic: ['Oбшение', 'Флирт 18+',]
        },
        {
            age: "старше 36 лет",
            type: "",
            topic: ['Oбшение', 'Флирт 18+',]
        }
    ])
    const [parametrSrc] = useState([
        {
            age: "Ищу сюжет",
            type: "",
        },
        {
            age: "Предлагаю сюжет",
            type: "",
        }

    ])
    const [disablet, setDisablet] = useState(false)

    function srcAge(e, age) {
        setSrcUserAge(prevValue =>
            prevValue.map(user =>
                user.age === age ?
                    user.type === e ? {...user, type: ''} : {...user, type: 'ACTIVE'} : user
            ))
    }

    function chatNow() {
        // navigate("/chat");
        const userAgeSrc = srcUserAge.filter((item) => item.type === "ACTIVE").map(item=>item.age)
        const userAllFilter = {
            ...filtrUser,
            partnerAges: filtrUser.gender === 'Некто' ? {} : userAgeSrc
        }
        axios.post(`${domen}/api/v1/auth/register`, userAllFilter).then((res) => {
            console.log(res)
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/chat");
        }).catch((error) => {
            console.log(error)
        })
        console.log()
    }

    function chatTema18(user, gender) {
        if (user === "user") {
            setFiltrUser({
                ...filtrUser,
                gender: gender,
                partnerGender: gender === "M" ? "Ж" : "M"
            })
        } else {
            setFiltrUser({
                ...filtrUser,
                gender: gender === "M" ? "Ж" : "M",
                partnerGender: gender
            })
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
        }
        else setDisablet(false);

    }, [filtrUser.gender, filtrUser.topic]);


    return (
        <div className='main'>
            <div className={`${style.container}`}>
                <div className="grid grid-cols-2 gap-5 xl:gap-16 ">
                    <div className=''>
                        <p className='text-white text-4xl font-bold uppercase'>
                            find friend youre life
                        </p>
                        <div className=" dark:bg-primary w-full bg-blue-50 rounded-3xl drop-shadow-2xl mt-10 p-5">
                            <div className="flex gap-2">
                                <DarkMode/>
                            </div>
                            <p className='mt-5'>Тема общения:</p>
                            <Flex vertical gap="middle">
                                <Radio.Group defaultValue='Oбшение' buttonStyle="solid"
                                             className='h-11 flex justify-between'
                                             onChange={(e) => {
                                                 setFiltrUser({
                                                     ...filtrUser,
                                                     topic: e.target.value,
                                                     gender: '',
                                                     partnerGender: '',
                                                     age: '',
                                                     partnerAges: {}
                                                 })
                                                     setSrcUserAge(prevValue =>
                                                         prevValue.map(user => {
                                                                 return {...user, type: ''}
                                                             }
                                                         ))
                                             }}>
                                    <Radio.Button className='bg-slate-800 rounded-lg text-white h-full pt-1.5 px-16'
                                                  value="Oбшение">Oбшение</Radio.Button>
                                    <Radio.Button className='bg-slate-800 rounded-lg text-white h-full pt-1.5 px-16 '
                                                  value="Флирт 18+">Флирт 18+</Radio.Button>
                                    <Radio.Button className='bg-slate-800 rounded-lg text-white h-full pt-1.5 px-16 '
                                                  value="Ролка">Ролка</Radio.Button>
                                </Radio.Group>
                            </Flex>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="w-full">
                                    <p>Ваш пол:</p>
                                    <Flex vertical gap="middle">
                                        <Radio.Group buttonStyle="solid" className='h-11'
                                                     value={filtrUser.gender}
                                                     onChange={(e) => {
                                                         filtrUser.topic === "Флирт 18+" ?
                                                             chatTema18("user", e.target.value)
                                                             :
                                                             setFiltrUser({
                                                                 ...filtrUser,
                                                                 gender: e.target.value,
                                                                 age: e.target.value === "Некто" ? '' : filtrUser.age
                                                             })
                                                     }}>
                                            {
                                                filtrUser.topic !== "Флирт 18+" && filtrUser.topic!=="Ролка" ?
                                                    <Radio.Button className='bg-slate-800 text-white h-full w-24 pt-1.5'
                                                                  value="Некто">Некто</Radio.Button>
                                                    : ''
                                            }

                                            <Radio.Button className='bg-slate-800 text-white h-full w-20 pt-1.5'
                                                          value="M">M</Radio.Button>
                                            <Radio.Button className='bg-slate-800 text-white h-full w-20 pt-1.5'
                                                          value="Ж">Ж</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                                <div className="w-full">
                                    <p>Пол собеседника:</p>
                                    <Flex vertical gap="middle">
                                        <Radio.Group buttonStyle="solid" className='h-11'
                                                     value={filtrUser.partnerGender}
                                                     onChange={(e) => {
                                                         filtrUser.topic === "Флирт 18+" ?
                                                             chatTema18("src", e.target.value)
                                                             :
                                                             setFiltrUser({
                                                                 ...filtrUser,
                                                                 partnerGender: e.target.value
                                                             })
                                                     }}>
                                            {
                                                filtrUser.topic !== "Флирт 18+" ?
                                                    <Radio.Button className='bg-slate-800 text-white h-full w-24 pt-1.5'
                                                                  value="Не важно">Не важно</Radio.Button>
                                                    : ''
                                            }

                                            <Radio.Button disabled={disablet}
                                                          className={`bg-slate-800 text-white h-full w-20 pt-1.5`}
                                                          value="M">M</Radio.Button>
                                            <Radio.Button disabled={disablet}
                                                          className='bg-slate-800 text-white h-full w-20 pt-1.5'
                                                          value="Ж">Ж</Radio.Button>
                                        </Radio.Group>
                                    </Flex>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                {
                                    disablet ? '' : <div className="flex flex-col gap-2">
                                        {
                                            filtrUser.topic==="Ролка"? "": <p>Ваш возраст:</p>
                                        }

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
                                                    srcUserAge.filter(item => item?.topic?.includes(filtrUser.topic)).map((item, index) => {
                                                            return (
                                                                <Radio.Button key={index}
                                                                              className={`bg-slate-800 mt-2 rounded-lg w-full text-white h-11 pt-1.5`}
                                                                              value={item.age}
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
                                        {
                                            filtrUser.topic==="Ролка"? "" :  <p className='mb-1.5'>Возраст собеседника:</p>
                                        }

                                        {
                                            srcUserAge.filter(item => item?.topic?.includes(filtrUser.topic)).map((item, index) =>
                                                <button
                                                    key={index}
                                                    className={`border border-white bg-slate-800 rounded-lg mt-0.4 w-full text-white h-11  ${item.type}
                                                    hover:text-blue-600 text-sm`}
                                                    onClick={() => srcAge("ACTIVE", item.age)}
                                                >
                                                    {item?.age}
                                                </button>
                                            )
                                        }
                                    </div>
                                }

                            </div>
                            {
                                filtrUser.topic==="Ролка"? <div>
                                    <p className='mb-1.5'>Параметры поиска:</p>
                                    <Flex className='w-full'>
                                        <Radio.Group
                                            className='w-full'
                                            buttonStyle="solid"
                                            onChange={(e) => {
                                                setFiltrUser({...filtrUser, parametr: e.target.value})
                                            }}
                                            style={{cursor: disablet ? 'not-allowed' : ''}}
                                            disabled={disablet}
                                            value={filtrUser.parametr}
                                        >
                                            {
                                                parametrSrc.map((item, index) => {
                                                        return (
                                                            <Radio.Button key={index}
                                                                          className={`bg-slate-800 mt-2 rounded-lg w-full text-white h-11 pt-1.5`}
                                                                          value={item.age}
                                                            >
                                                                {item?.age}
                                                            </Radio.Button>
                                                        )
                                                    }
                                                )
                                            }
                                        </Radio.Group>
                                    </Flex>

                                </div> : ''
                            }
                            <div className="flex justify-center">
                                <button className='text-lg text-white Partner mt-10 mb-5 px-9 py-2.5 my-20'
                                        onClick={() => {
                                            chatNow()

                                        }}>
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