import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';


function Test() {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const stompClientRef = useRef(null);
    const heartbeatIntervalRef = useRef(null);

    useEffect(() => {
        // Connect to WebSocket
        connectWebSocket();

        // Cleanup on unmount
        return () => {
            disconnectWebSocket();
            if (heartbeatIntervalRef.current) {
                clearInterval(heartbeatIntervalRef.current);
            }
        };
    }, []);

    const connectWebSocket = () => {
        const socket = new SockJS('https://chat-api.uplink.uz/chat');
        const client = new Client({
            webSocketFactory: () => socket,
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            connectHeaders: {
                'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NDU2NjU4NDEsImlkIjo2Mywicm9sZXMiOiJST0xFX1VTRVIiLCJleHAiOjE3NDYyNzA2NDEsImlzcyI6IkFub255bW91cyBjaGF0In0.UKqKlqT1AbmT2cfnMvuDqO_c_8GCkk3zhjApX9Iy-KCUAebEnAWi5j1FiB4UVP9uCJyqyp5fBtyatoLerSN3rg`
            }
        });

        client.onConnect = (frame) => {
            setConnected(true);
            console.log('Connected: ' + frame);

            // Subscribe to a channel
            client.subscribe('/topic/public', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });

            // Setup manual heartbeat as additional protection
            heartbeatIntervalRef.current = setInterval(() => {
                if (client.connected) {
                    client.publish({
                        destination: '/app/heartbeat',
                        body: JSON.stringify({ type: 'PING', timestamp: new Date().getTime() })
                    });
                }
            }, 20000); // Send heartbeat every 20 seconds
        };

        client.onStompError = (frame) => {
            console.error('STOMP error', frame);
            setConnected(false);
        };
        socket.onclose = function(event) {
            console.log('WebSocket connection closed', event);
            console.log('Close code:', event.code);
            console.log('Close reason:', event.reason);
        };
        socket.onerror = function(error) {
            console.error('WebSocket error observed:', error);
        };

        client.onWebSocketClose = () => {
            console.log('WebSocket connection closed');
            setConnected(false);
            // Attempt to reconnect
            setTimeout(connectWebSocket, 5000);
        };

        client.activate();
        stompClientRef.current = client;
    };

    const disconnectWebSocket = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            stompClientRef.current.deactivate();
        }
        setConnected(false);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || !connected) return;

        const message = {
            content: inputMessage,
            sender: 'User',
            // timestamp: new Date().toISOString(),
            type: "MESSAGE"
        };

        stompClientRef.current.publish({
            destination: '/app/chat.sendMessage',
            body: JSON.stringify(message),
        });

        setInputMessage('');
    };

    return (
        <div className="chat-container">
            <div className="connection-status">
                Status: {connected ? 'Connected' : 'Disconnected'}
                <button onClick={connected ? disconnectWebSocket : connectWebSocket}>
                    {connected ? 'Disconnect' : 'Connect'}
                </button>
            </div>

            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.sender}:</strong> {msg.content}
                        <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={sendMessage} className="message-form">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={!connected}
                />
                <button type="submit" disabled={!connected}>
                    Send
                </button>
            </form>
        </div>
    );
}

export default Test;