import React, { useState } from "react";


const ChatModal = ({ tourist, onClose }) => {
    const [messages, setMessages] = useState([
        { sender: "tourist", text: "I would like to change the destination of my trip." },
        { sender: "agent", text: "Hi (Tourist Name), tell me the place you want to go to and I'll change it for you." }
    ]);
    

    const sendMessage = () => {
        const input = document.getElementById("message-input");
        const text = input.value.trim();
        if (text) {
            setMessages([...messages, { sender: "agent", text }]);
            input.value = "";
        }
    };

    return (
        <div className="RequestPage-chat-modal">
            <div className="RequestPage-chat-content">
                <span className="RequestPage-close-btn" onClick={onClose}>&times;</span>
                <h5>{tourist.name}</h5>
                <div className="RequestPage-chat-messages">
                    {messages.map((msg, index) => (
                        <p key={index} className={msg.sender === "tourist" ? "RequestPage-tourist-msg" : "RequestPage-agent-msg"}>
                            {msg.text}
                        </p>
                    ))}
                </div>
                <div className="RequestPage-chat-input">
                    <input type="text" id="message-input" placeholder="Send a message" />
                    <button onClick={sendMessage}>&#10148;</button>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;

