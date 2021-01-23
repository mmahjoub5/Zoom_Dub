import React, { useState } from 'react';
import config from './config';
import io from 'socket.io-client';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import BottomBar from './BottomBar';

const ChatRoom = (props) => {
    const [chat, setChat] = useState(0);
    const [message, setMessage] = useState(0);
    const [email,setEmail] = useState(0);

    function handleMessage(e){
        setMessage(e.target.value)
    };

    function handleSubmit(e){
        //emit socket
        //props.socket.emit('message',{ name: email, message: message})
    }

     // Always make sure the window is scrolled down to the last message.
    function scrollToBottom() {
        const chat = document.getElementById('chat');
        chat.scrollTop = chat.scrollHeight;
    }

    
    
    return (  );
}
 
export default ChatRoom;