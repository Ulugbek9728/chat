import "./chat.scss"
import DarkMode from "@/Components/darkMode/darkMode.jsx";
import {useNavigate} from "react-router-dom";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {SmileTwoTone} from '@ant-design/icons';
import {Popover} from 'antd';
import {useEffect, useState} from "react";

import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client'
import Loading from "@/Components/loading/loading.jsx";
import {domen} from "../../domen.jsx"


function Chat() {
    const [fulInfo] = useState(JSON.parse(localStorage.getItem("user")));

    const navigate = useNavigate();

    const [messages, setMessages] = useState([])

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [tugatishBtn, setTugatishBtn] = useState(false)
    const [stompClient, setStompClient] = useState(null)

    useEffect(() => {
        if (stompClient == null) {
            const socket = new SockJS(`${domen}/chat`, null, {
                transports: ['websocket'],
                withCredentials: true
            });
            const client = Stomp.over(socket);

            client.heartbeat.incoming = 4000;
            client.heartbeat.outgoing = 4000;
            client.reconnect_delay = 5000;
            client.debug((m) => {
                console.log(m)
            });
            client
                .connect({'Authorization': `Bearer ${fulInfo.token}`}, () => {
                        client.subscribe(`/match-chat/${fulInfo?.id}`, handleSearchChat);
                        setStompClient(client);
                    },
                    (error) => {
                        console.log('error', error);
                    }
                );
        }
    }, [fulInfo, stompClient]);

    useEffect(() => {
        stompClient && sendSearchChat();
    }, [stompClient]);

    function sendSearchChat() {
        stompClient.send('/app/chat/match', {Authorization: `Bearer ${fulInfo?.token}`}, '');
    }

    function sendMessage() {
        if (message.trim()) {
            const chatMessage = {
                nickName: 1,
                content: message
            }
            stompClient.send(`/app/chat`, {}, {})
            // sendMessage('')
        }
    }

    function handleSearchChat(msg) {
        console.log(msg?.body)
        try {
            const message = JSON.parse(msg?.body);
            switch (message?.chat?.status) {
                case 'WAITING_TO_START': {
                    // setLoading(true);
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const content = (
        <Picker data={data} className="bg-white" theme="auto" previewPosition="none"
                onEmojiSelect={(emoji) => {
                    setMessage(prevState => prevState + emoji.native)
                }}/>
    );

    return (
        <div>
            <div className='bg-gray-400 dark:bg-slate-600 chat'>
                <div className="bg-gray-100 h-screen flex flex-col max-w-2xl mx-auto drop-shadow-2xl">
                    <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
                        <DarkMode/>
                        <span>Chat anonim</span>
                        {
                            tugatishBtn ? <button id="login" className="bg-red-500 rounded-md px-2 py-1"
                                                  onClick={() => {
                                                      // navigate("/");
                                                      sendSearchChat();
                                                  }}
                            >
                                Завершить чат
                            </button> : <div/>
                        }


                    </div>
                    {
                        loading ? <Loading/> :
                            <div>
                                <div className="flex-1 overflow-y-auto p-4">
                                    <div className="flex flex-col space-y-2">

                                        <div className="flex justify-end">
                                            <div
                                                className="bg-blue-200 text-black p-2 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl max-w-xs">
                                                Hey, hows your day going?
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div
                                                className="bg-gray-300 text-black p-2 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl max-w-xs">
                                                Not too bad, just a bit busy. How about you?
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="flex gap-5 absolute bottom-28 justify-center w-full">
                                    <button className='bg-blue-500 text-white px-5 py-2.5 min-w-60 rounded-2xl'>Изменить
                                        параметры
                                    </button>
                                    <button
                                        className="bg-emerald-600 text-white px-5 py-2.5  min-w-60 rounded-2xl">Начать
                                        новый чат
                                    </button>
                                </div>

                                <div className="bg-white p-4 flex items-center absolute bottom-0 w-full">
                                    <Popover theme="dark" placement="topLeft" content={content} trigger="click">
                                        <SmileTwoTone className="w-10 h-auto stiker"/>
                                    </Popover>

                                    <input type="text" placeholder="Type your message..."
                                           className="flex-1 border rounded-full text-blue-900 px-4 py-2 focus:outline-none"
                                           onChange={(e) => {
                                               setMessage(e.target.value)
                                           }}
                                           value={message}
                                    />
                                    <button onClick={() => sendMessage()}
                                            className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none">
                                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round"
                                               strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                                                    stroke="#ffffff" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round"></path>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                    }


                </div>
            </div>
        </div>


    );
}

export default Chat;