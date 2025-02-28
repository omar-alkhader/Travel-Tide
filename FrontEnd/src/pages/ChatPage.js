import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChatPage = () => {
    const { touristName } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);

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
                <span className="RequestPage-close-btn" onClick={() => navigate("/")}>
                    &times;
                </span>
                <h5>{touristName}</h5>
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

export default ChatPage;
