import "./chat.scss"
import DarkMode from "@/Components/darkMode/darkMode.jsx";
import {useNavigate} from "react-router-dom";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {SmileTwoTone} from '@ant-design/icons';
import {Popover} from 'antd';
import {useEffect, useRef, useState} from "react";

import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client'
import Loading from "@/Components/loading/loading.jsx";
import {domen} from "../../domen.jsx"
import Typeng from "@/Components/typengChat/typeng.jsx";
import {Form} from 'antd';


function Chat() {
    const [fulInfo] = useState(JSON.parse(localStorage.getItem("user")));

    const navigate = useNavigate();

    const [messages, setMessages] = useState([])
    const [isPartnerTyping, setIsPartnerTyping] = useState(false)
    const [isChatActive, setIsChatActive] = useState(false)

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [tugatishBtn, setTugatishBtn] = useState(false)
    const stompClient = useRef(null);

    const [findChatStompSubscription, setFindChatStompSubscription] = useState(null);
    const [chatMessageStompSubscription, setChatMessageStompSubscription] = useState(null);

    const [currentChat] = useState(JSON.parse(localStorage.getItem('currentChat')));

    useEffect(() => {
        if (currentChat?.status === "CLOSED") {
            localStorage.removeItem('currentChat')
            navigate('/');
            return;
        }
        if (fulInfo === null) {
            navigate('/');
            return;
        }
        return async () => {
            if (stompClient.current === null) {
                const socket = new SockJS(`${domen}/chat`, null, {
                    transports: ['websocket'],
                    withCredentials: true
                });
                const client = Stomp.over(socket);

                client.heartbeat.incoming = 4000;
                client.heartbeat.outgoing = 4000;
                client.reconnect_delay = 5000;

                await client.connect({'Authorization': `Bearer ${fulInfo?.token}`}, () => {
                        if (currentChat) {
                            setChatMessageStompSubscription(client.subscribe(
                                `/message/chat/${currentChat?.chatId}`,
                                handleChatMessages,
                                {Authorization: `Bearer ${fulInfo?.token}`},
                            ));
                            setIsChatActive(true)
                            setLoading(false);
                            setTugatishBtn(true);
                            client.send(`/app/message/old-chats/${currentChat?.chatId}`, {Authorization: `Bearer ${fulInfo?.token}`}, '')
                        } else {
                            setFindChatStompSubscription(client.subscribe(`/match-chat/${fulInfo?.id}`, handleSearchChat));
                        }
                    },
                    (error) => {
                        console.log('error', error);
                    }
                );
                stompClient.current = client;
            }
        }
    }, []);

    useEffect(() => {
        if (stompClient?.current !== null && localStorage.getItem('currentChat') === null) sendSearchChat();
    }, [stompClient?.current]);
    useEffect(() => {
        setTimeout(() => {
            setIsPartnerTyping(false);
        }, 3000)
    }, [isPartnerTyping])

    function sendSearchChat() {
        const chatFilter = localStorage.getItem('ChatFilter');
        if (chatFilter === null) {
            navigate('/')
            return
        }

        const request = JSON.parse(chatFilter);
        const body = {
            age: request.age,
            gender: request.gender,
            partnerGender: request.partnerGender,
            partnerAges: request.partnerAges
        };
        setTugatishBtn(false)
        setLoading(true);
        setIsChatActive(false)
        stompClient?.current && stompClient?.current?.send(
            '/app/chat/match',
            {Authorization: `Bearer ${fulInfo?.token}`},
            JSON.stringify(body)
        );
    }

    function sendMessage() {
        if (message.trim()) {
            if (stompClient?.current !== null) {
                const chatMessage = {
                    chatId: JSON.parse(localStorage.getItem('currentChat'))?.chatId,
                    content: message
                }
                stompClient?.current.send(`/app/message/send`, {Authorization: `Bearer ${fulInfo?.token}`}, JSON.stringify(chatMessage));
                setMessage('');
            }
        }
    }

    function handleSearchChat(msg) {
        try {
            const message = JSON.parse(msg?.body);
            switch (message?.chat?.status) {
                case 'WAITING_TO_START': {
                    setLoading(true);
                    break;
                }
                case 'ACTIVE': {
                    setIsChatActive(true)
                    setTugatishBtn(true);
                    setLoading(false)
                    findChatStompSubscription && findChatStompSubscription.unsubscribe();
                    localStorage.setItem('currentChat', JSON.stringify(message?.chat));
                    const subscribe = stompClient?.current.subscribe(
                        `/message/chat/${message?.chat?.chatId}`,
                        handleChatMessages,
                        {Authorization: `Bearer ${fulInfo?.token}`},
                    );
                    message?.chat?.chatId && setChatMessageStompSubscription(subscribe);
                    stompClient.current?.send(`/app/message/old-chats/${message?.chat?.chatId}`, {Authorization: `Bearer ${fulInfo?.token}`}, '')

                    break;
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    function handleChatMessages(msg) {
        const receivedMessage = JSON.parse(msg?.body);
        switch (receivedMessage?.action) {
            case 'new.message': {
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                break;
            }
            case 'chat.action': {
                if (receivedMessage?.typedUserId !== fulInfo?.id) {
                    setIsPartnerTyping(true);


                }
                break;
            }
            case 'chat.change.status': {
                localStorage.setItem('currentChat', JSON.stringify({...currentChat, status: 'CLOSED'}));
                setTugatishBtn(false);
                setIsChatActive(false)
                break;
            }
            case "old.messages": {
                console.log(receivedMessage.messages)
                setMessages(
                    receivedMessage?.messages?.map((item) => {
                        return {
                            message: item
                        }
                    })
                )
                break
            }
        }
    }

    const content = (
        <Picker data={data}
                className="bg-white"
                theme="auto"
                previewPosition="none"
                onEmojiSelect={(emoji) => {
                    setMessage(prevState => prevState + emoji.native)
                }}
        />
    );

    function sendChatAction(action) {
        stompClient?.current && stompClient?.current.send(
            '/app/chat-action/send',
            {Authorization: `Bearer ${fulInfo?.token}`},
            JSON.stringify({chatId: JSON.parse(localStorage.getItem('currentChat'))?.chatId, action: action})
        );
    }

    function finishChat() {
        if (isChatActive && chatMessageStompSubscription !== null && stompClient?.current !== null) {
            stompClient?.current.send('/app/chat/finish', {Authorization: `Bearer ${fulInfo?.token}`}, JSON.stringify({chatId: JSON.parse(localStorage.getItem('currentChat'))?.chatId}));
            localStorage.setItem('currentChat', JSON.stringify({...currentChat, status: 'CLOSED'}));
            console.log('finishchat')
            setIsChatActive(false);
            setTugatishBtn(false);
            chatMessageStompSubscription.unsubscribe();
            stompClient?.current?.disconnect();
        } else {
            console.log('finish chat error')
        }
    }

    function newChat() {
        localStorage.removeItem('currentChat');
        location.reload();
    }

    return (
        <div>
            <div className='bg-gray-400 dark:bg-slate-600 chat'>
                <div className="bg-gray-100 h-screen flex flex-col max-w-2xl mx-auto drop-shadow-2xl overflow-y-hidden">
                    <div style={{backgroundColor: "#f65130"}}
                         className=" p-4 text-white flex justify-between items-center">
                        <DarkMode/>
                        <span>Chat anonim</span>
                        {
                            tugatishBtn ? <button id="login" className="bg-sky-800 rounded-md px-2 py-1"
                                                  onClick={() => {
                                                      finishChat();
                                                  }}
                            >
                                Завершить чат
                            </button> : <div/>
                        }
                    </div>
                    {
                        loading ? <Loading onCancel={() => {
                                stompClient?.current.send('/app/chat/cancel', {Authorization: `Bearer ${fulInfo?.token}`},'');
                                stompClient?.current && stompClient?.current?.disconnect((msg) => {
                                }, {Authorization: `Bearer ${fulInfo?.token}`});
                            }}
                            /> :
                            <div>
                                <div className="flex-1 overflow-y-auto p-4 pb-32" style={{height: "84vh"}}>
                                    <div className="flex flex-col space-y-2 h-full ">
                                        {isPartnerTyping && <Typeng userName={"Yozmoqda"}/>}
                                        {messages?.map(item => {
                                            const oneMessage = item?.message;
                                            return (
                                                <div key={item?.message?.messageId}>
                                                    {
                                                        oneMessage?.senderId === fulInfo?.id ?
                                                            <div className="flex justify-end"
                                                                 key={item?.message?.messageId}>
                                                                <div
                                                                    className="bg-blue-200 text-black p-2 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl max-w-xs">
                                                                    {oneMessage?.content}
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="flex" key={item?.message?.messageId}>
                                                                <div
                                                                    className="bg-gray-300 text-black p-2 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl max-w-xs">
                                                                    {oneMessage?.content}
                                                                </div>
                                                            </div>
                                                    }

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {
                                    !tugatishBtn &&
                                    <div className=" absolute bottom-8 w-full">
                                        <p className='text-center text-black'>Завершил чат:</p>
                                        <div className="flex gap-5  justify-center w-full">
                                            <button className='bg-blue-500 text-white px-5 py-2.5 min-w-60 rounded-2xl'
                                                    onClick={() => {
                                                        localStorage.removeItem('currentChat')
                                                        navigate('/')
                                                    }}>
                                                Изменить параметры
                                            </button>
                                            <button
                                                className="bg-emerald-600 text-white px-5 py-2.5  min-w-60 rounded-2xl"
                                                onClick={() => newChat()}
                                            >Начать
                                                новый чат
                                            </button>
                                        </div>
                                    </div>
                                }

                                <div
                                    className={`bg-white p-4 flex items-center absolute bottom-0 w-full  ${!isChatActive ? 'hidden' : ''}`}>
                                    <Popover theme="dark" placement="topLeft" content={content} trigger="click">
                                        <SmileTwoTone className="w-10 h-auto stiker"/>
                                    </Popover>

                                    <Form name="basic" className='w-full'
                                          layout={"inline"}
                                          initialValues={{remember: true,}}
                                          onFinish={sendMessage}
                                    >
                                        <Form.Item>
                                            <input type="text" placeholder="Type your message..."

                                                   className="flex-1 border rounded-full text-blue-900 px-4 py-2 focus:outline-none"
                                                   onChange={(e) => {
                                                       setMessage(e.target.value);
                                                       sendChatAction('TYPING');
                                                   }}
                                                   value={message}
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            {/* eslint-disable-next-line react/no-unknown-property */}
                                            <button onClick={() => sendMessage()}
                                                    className="bg-blue-500 text-white rounded-full p-2 ml-1 hover:bg-blue-600 focus:outline-none"
                                            >
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
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Chat;