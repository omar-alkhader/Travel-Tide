import React, { useState, useRef, useEffect } from 'react';
import chatIcon from '../assets/chat.png';
import messageIcon from '../assets/message.png';
import guideIcon from '../assets/tour-guide.png';
import { FaUser } from 'react-icons/fa';

const ChatButton = ({ isOpen: externalIsOpen, setIsOpen: setExternalIsOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm your travel guide. How can I help you today?", sender: 'guide' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Sync with external state if provided
    useEffect(() => {
        if (externalIsOpen !== undefined) {
            setIsOpen(externalIsOpen);
        }
    }, [externalIsOpen]);

    const toggleChat = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        if (setExternalIsOpen) setExternalIsOpen(newIsOpen);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        // Add user message
        const userMessage = { id: messages.length + 1, text: newMessage, sender: 'user' };
        setMessages([...messages, userMessage]);
        setNewMessage('');

        // Simulate guide response after a short delay
        setTimeout(() => {
            const guideResponses = [
                "I can definitely help you with that!",
                "mhm",
            ];
            const randomResponse = guideResponses[Math.floor(Math.random() * guideResponses.length)];
            const guideMessage = { id: messages.length + 2, text: randomResponse, sender: 'guide' };
            setMessages(prevMessages => [...prevMessages, guideMessage]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="chat-container">
            {isOpen && (
                <div className="chat-box">
                    <div className="chat-header">
                        <div className="guide-info">
                            <div className="guide-avatar">
                                <img src={guideIcon} alt="Guide Avatar" className="tour-guide-img" />
                            </div>
                            <div className="guide-name">Ahmed </div>
                        </div>
                        <button className="close-chat" onClick={toggleChat}>×</button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.sender === 'user' && (
                                    <div className="user-avatar">
                                        <FaUser />
                                    </div>
                                )}
                                <div className="message-text">{msg.text}</div>
                                {msg.sender === 'guide' && (
                                    <div className="guide-avatar small">
                                        <img src={guideIcon} alt="Guide Avatar" className="tour-guide-img" />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                        />
                        <button onClick={handleSendMessage} className="send-button">
                            <img src={messageIcon} alt="Send" />
                        </button>
                    </div>
                </div>
            )}
            <button className={`chat-button ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
                <img src={chatIcon} alt="Chat" />
            </button>
        </div>
    );
};

export default ChatButton;