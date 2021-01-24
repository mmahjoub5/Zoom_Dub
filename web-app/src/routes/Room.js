import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
// import ChatRoom from "./ChatRoom";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BottomBar from './BottomBar';

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}


const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};

const Room = (props) => {
    console.log(props);
    const [peers, setPeers] = useState([]); //collection of peers for rendering
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]); //collection of peers/users for logic
    const roomID = props.match.params.roomId;

    //experimenting
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState('');
    const [email,setEmail] = useState('');
    
    //*EVENT HANDLER *//
    useEffect(() => { //connect to room the first time
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false })
            .then(stream => { //ask for camera, 3 different events to listen on
                userVideo.current.srcObject = stream;
                socketRef.current.emit("join room", roomID); //tell server that I joined
                console.log("ROOM ", roomID);
                socketRef.current.on("all users", users => { //when server returns all users after I connect
                    const peers = [];
                    users.forEach(userID => {
                        const peer = createPeer(userID, socketRef.current.id, stream);
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        }) //push object pair of peerid <-> peer
                        peers.push(peer); //add to array of peers ref for logic
                    })
                    setPeers(peers); //our peers for rendering
                })

                socketRef.current.on("user joined", payload => { //when others join my rooms
                    const peer = addPeer(payload.signal, payload.callerID, stream);
                    peersRef.current.push({
                        peerID: payload.callerID,
                        peer,
                    }) //create peer

                    setPeers(users => [...users, peer]); //add peer to users array
                });

                socketRef.current.on("receiving returned signal", payload => {
                    const item = peersRef.current.find(p => p.peerID === payload.id);
                    item.peer.signal(payload.signal);
                });

                socketRef.current.on("push", msg => {
                    setChat(chat => [...chat, msg]);
                    scrollToBottom();
                });
            })
    }, []);

    //HELPERS FOR VIDEO CHAT
    function createPeer(userToSignal, callerID, stream) { //when I get signal from others in a room i just joined
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) { //when you receive a signal from someone who just joined your room
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => { //I got their signal, I'm sending my signal back out
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    //HELPER FOR CHATROOM
    function handleMessage(e){
        e.preventDefault();
        setMessage(e.target.value)
    };

    function handleEmail(e){
        e.preventDefault();
        setEmail(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        //emit socket
        //socket.emit('message',{ name: email, message: message})
        socketRef.current.emit('message', {email: email,content: message});
        console.log("send");
        setChat(chat => [...chat, {email: email,content: message}]);
        setMessage('');
        scrollToBottom();
    }

     // Always make sure the window is scrolled down to the last message.
    function scrollToBottom() {
        const chat = document.getElementById('chat');
        chat.scrollTop = chat.scrollHeight;
    }

    //RENDER
    return (
        <div>
            <Container>
                <StyledVideo muted ref={userVideo} autoPlay playsInline />
                {peers.map((peer, index) => {
                    return (
                        <Video key={index} peer={peer} />
                    );
                })}
            </Container>
            <Container>
                <Paper id="chat" elevation={3}>
                    {chat.map((el, index) => {
                    return (
                        <div key={index}>
                        {console.log(el)}
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
            </Container>
            <BottomBar
                message={message}
                handleMessage={handleMessage}
                handleEmail={handleEmail}
                handleSubmit={handleSubmit}
                email={email}
            />
        </div>
    );
};

export default Room;