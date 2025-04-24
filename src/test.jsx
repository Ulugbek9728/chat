import {useEffect} from 'react';
import SockJS from 'sockjs-client';


function Test() {
    useEffect(() => {

        const socket = new SockJS('http://194.146.38.230:8081/ws');

        socket.onopen = function() {
            console.log('Connected');
        };

        socket.onclose = function(e) {
            console.log('Connection closed', e);
        };

        socket.onerror = function(e) {
            console.log('Error', e);
        };

    }, []);
    return (
        <div></div>
    );
}

export default Test;