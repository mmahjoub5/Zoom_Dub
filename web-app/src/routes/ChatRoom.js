import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BottomBar from './BottomBar';

const ChatRoom = (props) => {
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState('');
    const [email,setEmail] = useState('');

    const socket = props.socket;

    function handleMessage(e){
        setMessage(e.target.value)
    };

    function handleEmail(e){
        setEmail(e.target.value)
    }

    function handleSubmit(e){
        //emit socket
        //socket.emit('message',{ name: email, message: message})
        socket.emit('message', {
            email: email,
            content: message,
          });
        console.log("send");
    }

     // Always make sure the window is scrolled down to the last message.
    function scrollToBottom() {
        const chat = document.getElementById('chat');
        chat.scrollTop = chat.scrollHeight;
    }

    

    return (
        <div className="ChatRoom">
            <Paper id="chat" elevation={3}>
                {chat.map((el, index) => {
                return (
                    <div key={index}>
                    <Typography variant="caption" className="email">
                        {el.email}
                    </Typography>
                    <Typography variant="body1" className="message">
                        {el.message}
                    </Typography>
                    </div>
                );
                })}
            </Paper>
            <BottomBar
                message={message}
                handleMessage={handleMessage}
                handleEmail={handleEmail}
                handleSubmit={handleSubmit}
                email={email}
            />
        </div>
    );

}
 
export default ChatRoom;