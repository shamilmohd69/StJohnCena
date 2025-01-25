import React, { useState, useEffect } from 'react';
import './Comp.css';
import axios from 'axios';

import sent from '../Util/sent.svg';

const MsgFrnd = ({ friendId, userId }) => {

    const [messages, setMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState("");


    const handleSubmit = async () => {
        if (!inputMsg) return;

        try {
            await axios.post('http://localhost:4000/student/send_msg', {
                sender: userId,
                receiver: friendId.login,
                message: inputMsg
            });
            setMessages([...messages, { sender: userId, message: inputMsg }]);
            setInputMsg("");
        } catch (err) {
            console.log(err);
        }
    };



    useEffect(() => {
        const viewMessages = async () => {

            try {
                const res = await axios.get(
                    `http://localhost:4000/student/view_msg?id1=${userId}&id2=${friendId.login}`
                );
                setMessages(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        viewMessages();

        const interval = setInterval(() => {
            viewMessages();
        }, 5000);

        return () => clearInterval(interval);
    }, [userId, friendId.login]);

    return (
        <div className='msgfrnd'>
            <h6 className="name">{friendId.firstname} {friendId.lastname}</h6>
            <div className='messages'>
                {messages.map((item, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: item.sender === userId ? 'flex-end' : 'flex-start' }}>
                        <p className={item.sender === userId ? 'sent' : 'received'} style={{ textAlign: item.sender === userId ? 'right' : 'left' }}>
                            {item.message}
                        </p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder='Message'
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                />
                <button className="send-button" onClick={handleSubmit}><img src={sent} alt="sent" /></button>
            </div>
        </div>
    );
};

export default MsgFrnd;