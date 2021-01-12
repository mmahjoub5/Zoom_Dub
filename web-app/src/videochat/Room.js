import React from 'react';
import MetaTags from 'react-meta-tags';

class Room extends React.Component {
    state = {
        ROOM_ID: ""
    }
    render() {
        return (
            <MetaTags>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
                <script>
                    {this.state.ROOM_ID = "<%= roomId %>"}
                </script>
                <script defer src="https://unpkg.com/peerjs@1.2.0/dist/peerjs.min.js"></script>
                <script src="/socket.io/socket.io.js" defer></script>
                <script src="script.js" defer></script>
                <title>Document</title>
                <div id="video-grid"></div>
            </MetaTags>
        )
    }
}

export default Room