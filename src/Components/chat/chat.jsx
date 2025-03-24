import "./chat.scss";
import DarkMode from "@/Components/darkMode/darkMode.jsx";
import {useNavigate} from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {SmileTwoTone} from "@ant-design/icons";
import {Form, Popover} from "antd";
import {useEffect, useRef, useState} from "react";
import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Loading from "@/Components/loading/loading.jsx";
import Typeng from "@/Components/typengChat/typeng.jsx";
import {useTranslation} from "react-i18next";
import {domen} from "../../domen.jsx";


function Chat() {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const currentChat = JSON.parse(localStorage.getItem("currentChat"));
    const [messages, setMessages] = useState([]);
    const [isPartnerTyping, setIsPartnerTyping] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [showEndChatButton, setShowEndChatButton] = useState(false);
    const [connected, setConnected] = useState(false);
    /**
     * @type {SockJS | null}
     */
    const stompClient = useRef(null);

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        if (!userInfo || currentChat?.status === "CLOSED") {
            localStorage.removeItem("currentChat");
            navigate("/");
            return;
        }
        if (stompClient.current == null) {
            initializeWebSocket();
        }

        // return () => stompClient.current?.disconnect();
    }, []);

    useEffect(() => {
        if (stompClient?.current && connected) sendSearchChat();
    }, [stompClient?.current, connected]);

    const initializeWebSocket = () => {
        /**
         * @type {SockJS}
         */
        const socket = new SockJS(`${domen}/chat`, null, {
            transports: ["websocket"],
            withCredentials: true,
        });
        /**
         * @type {CompatClient}
         */
        const client = Stomp.over(socket);

        client.heartbeat.incoming = 4000;
        client.heartbeat.outgoing = 4000;
        client.reconnect_delay = 5000;
        client.connect(
            {Authorization: `Bearer ${userInfo?.token}`},
            () => {
                console.log("WebSocket Connected");
                onWebSocketConnected(client)
            },
            (error) => console.error("WebSocket Error:", error)
        );
        stompClient.current = client;
    };
    /**
     * @param {CompatClient} client
     * @param client
     */
    const onWebSocketConnected = (client) => {
        setConnected(true);

        if (currentChat) {
            subscribeToChat(client, currentChat.chatId);
            setIsChatActive(true);
            setLoading(false);
            setShowEndChatButton(true);
        } else {
            console.log(`start match ${userInfo?.id}`)
            client.subscribe(`/match-chat/${userInfo?.id}`, handleSearchChat, {Authorization: `Bearer ${userInfo?.token}`});
        }
    };

    /**
     * @param {CompatClient} client
     * @param client
     * @param chatId
     */
    const subscribeToChat = (client, chatId) => {
        client.subscribe(
            `/message/chat/${chatId}`,
            handleChatMessages,
            {Authorization: `Bearer ${userInfo?.token}`}
        );
        client.send(
            `/app/message/old-chats/${chatId}`,
            {Authorization: `Bearer ${userInfo?.token}`}
        );
    };

    const handleSearchChat = (msg) => {
        const message = JSON.parse(msg.body);
        switch (message?.chat?.status) {
            case "WAITING_TO_START":
                setLoading(true);
                break;
            case "ACTIVE":
                localStorage.setItem("currentChat", JSON.stringify(message.chat));
                subscribeToChat(stompClient.current, message.chat.chatId);
                setIsChatActive(true);
                setShowEndChatButton(true);
                setLoading(false);
                break;
            default:
                console.warn("Unhandled chat status:", message?.chat?.status);
        }
    };

    const handleChatMessages = (msg) => {
        const receivedMessage = JSON.parse(msg.body);
        console.log(receivedMessage)
        switch (receivedMessage.action) {
            case "new.message":
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                break;
            case "chat.action":
                if (receivedMessage?.typedUserId !== userInfo?.id) {
                    setIsPartnerTyping(true);
                    setTimeout(() => setIsPartnerTyping(false), 3000);
                }
                break;
            case "chat.change.status":
                endChatSession();
                break;
            case "old.messages":
                setMessages(receivedMessage?.messages?.map((msg) => ({message: msg})));
                break;
            default:
                console.warn("Unhandled chat message action:", receivedMessage.action);
        }
    };

    const sendMessage = () => {
        if (!message.trim() || !stompClient.current) return;

        const chatMessage = {
            chatId: currentChat?.chatId,
            content: message,
        };
        console.log(chatMessage)
        stompClient.current.send(
            "/app/message/send",
            {Authorization: `Bearer ${userInfo?.token}`},
            JSON.stringify(chatMessage)
        );
        setMessage("");
    };

    function sendChatAction(action) {
        console.log(currentChat)
        stompClient?.current && stompClient?.current.send(
            '/app/chat-action/send',
            {Authorization: `Bearer ${userInfo?.token}`},
            JSON.stringify({chatId: currentChat?.chatId, action: action})
        );
    }

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
        setShowEndChatButton(false)
        setLoading(true);
        setIsChatActive(false)
        if (stompClient?.current?.active && connected) {
            stompClient?.current?.send(
                '/app/chat/match',
                {Authorization: `Bearer ${userInfo?.token}`},
                JSON.stringify(body)
            );
        }
    }

    const endChatSession = () => {
        setShowEndChatButton(false);
        setIsChatActive(false);
        localStorage.setItem(
            "currentChat",
            JSON.stringify({...currentChat, status: "CLOSED"})
        );
    };
    const finishChat = () => {
        if (!isChatActive || stompClient.current == null) return;

        stompClient.current.send(
            "/app/chat/finish",
            {Authorization: `Bearer ${userInfo?.token}`},
            JSON.stringify({chatId: currentChat?.chatId})
        );
        endChatSession();
        stompClient.current.disconnect();
    };

    const content = (
        <Picker
            data={data}
            theme="auto"
            previewPosition="none"
            onEmojiSelect={(emoji) => setMessage((prev) => prev + emoji.native)}
        />
    );

    function newChat() {
        localStorage.removeItem('currentChat');
        location.reload();
    }


    return (
        <div>
            <div className='bg-blue-50 dark:bg-darkBlue3 chat'>
                <div
                    className="bg-white dark:bg-darkBlue2 h-screen flex flex-col max-w-2xl mx-auto drop-shadow-2xl overflow-y-hidden">
                    <div
                        className=" bg-amber p-4 text-white flex justify-between items-center">
                        <DarkMode/>
                        <span>{t("loding.Chat_Anonim")}</span>
                        {
                            showEndChatButton ?
                                <button id="login" className="bg-sky-800 rounded-md px-1 2sm:px-2 py-1"
                                        onClick={() => {
                                            finishChat();
                                        }}
                                >
                                    {t("chat.End_chat")}
                                </button> :
                                <div></div>
                        }
                    </div>
                    {
                        loading ? <Loading onCancel={() => {
                                stompClient?.current.send('/app/chat/cancel', {Authorization: `Bearer ${userInfo?.token}`}, '');
                                stompClient?.current && stompClient?.current?.disconnect(() => {
                                }, {Authorization: `Bearer ${userInfo?.token}`});
                            }}
                            /> :
                            <div>
                                <div className=" flex-1 overflow-y-auto p-4 pb-32" style={{height: "84vh"}}>
                                    <div className="flex flex-col space-y-2 h-full ">
                                        {isPartnerTyping && <Typeng userName={"Yozmoqda"}/>}

                                        {messages?.map(item => {
                                            const oneMessage = item?.message;
                                            return (
                                                <div key={item?.message?.messageId}>
                                                    {
                                                        oneMessage?.senderId === userInfo?.id ?
                                                            <div className="flex justify-end"
                                                                 key={item?.message?.messageId}>
                                                                <div className="break-words bg-bluee text-white p-2 text-right
                                                                     rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl max-w-xs">
                                                                    <p className="text-left">{oneMessage?.content}</p>
                                                                    <span className="text-xs">{oneMessage?.createdDate.slice(11,16)}</span>
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className="flex"
                                                                 key={item?.message?.messageId}>
                                                                <div className="break-words bg-blue-200 text-black p-2
                                                                    rounded-tl-2xl rounded-br-2xl rounded-tr-2xl max-w-xs">
                                                                    <p>{oneMessage?.content}</p>
                                                                    <span className="text-xs">{oneMessage?.createdDate.slice(11,16)}</span>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {
                                    !showEndChatButton &&
                                    <div className=" absolute bottom-8 w-full">
                                        <p className='text-center text-black mb-3 dark:text-white text-black'>{t("chat.Ended_chat")}:</p>
                                        <div className="flex gap-3 3sm:gap-5  justify-center w-full">
                                            <button
                                                className='bg-blue-500 text-white px-2 3sm:px-5 py-2.5 min-w-30 sm:min-w-60 rounded-2xl'
                                                onClick={() => {
                                                    localStorage.removeItem('currentChat')
                                                    navigate('/')
                                                }}>
                                                {t("chat.Change_settings")}
                                            </button>
                                            <button
                                                className="bg-emerald-600 text-white px-2 3sm:px-5 py-2.5  min-w-30 sm:min-w-60 rounded-2xl"
                                                onClick={() => newChat()}
                                            >{t("chat.Start_new_chat")}
                                            </button>
                                        </div>
                                    </div>
                                }
                                <div
                                    className={`bg-white p-2 2sm:p-4  absolute bottom-0 w-full  ${!isChatActive ? 'hidden' : ''}`}>
                                    <div className="relative  flex items-center justify-between">
                                        <Popover className='absolute z-10 left-1 top-1' theme="dark" placement="topLeft"
                                                 content={content} trigger="click">
                                            <SmileTwoTone className="w-10 h-auto stiker"/>
                                        </Popover>

                                        <Form name="basic" layout={"inline"} className="w-full "
                                              initialValues={{remember: true,}}
                                              onFinish={sendMessage}>
                                            <Form.Item className='input '>
                                                <input type="text" placeholder="Type your message..."
                                                       className="w-full flex-1 border rounded-full text-blue-900 px-4 py-2 focus:outline-none"
                                                       onChange={(e) => {
                                                           setMessage(e.target.value);
                                                           sendChatAction('TYPING');
                                                       }}
                                                       value={message}
                                                />
                                            </Form.Item>

                                            <Form.Item className='button  m-0'>
                                                <button onClick={() => sendMessage()}
                                                        className=" bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none"
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
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Chat;