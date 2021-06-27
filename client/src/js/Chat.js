import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';

let socket;

const Chat = ({location}) => {
    const [name, setName] = userState('');
    const [room, setRoom] = userState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:9000'

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setRoom(room);
        setName(name);

        socket.emit('join', {name, room}, (error)=> {
            if (error) {
                alert(error);
            }

        });
    },[ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessage(messages => [messages, message]);
        });
        socket.io("roomData", ({users}) => {
            setUsers(users);

        });
    },[]);

    const sendMessage =(event) => {
        event.preventDefault();

        if(message){
            socket.emit("sendMessage", message, () => setMessage(''));
        }   
    }

    return (

        <div className="messageOuterContainer">
            <div className = "messageContainer">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );

}

export default Chat;
