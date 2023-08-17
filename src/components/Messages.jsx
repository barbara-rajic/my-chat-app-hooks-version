import React from "react";
import Message from "./Message";

const Messages = ({ messages, currentMember }) => {
    return (
        <ul className="Messages-list">
            {messages.map((message) => (
                <Message
                    key={message.id}
                    message={message}
                    currentMember={currentMember}
                />
            ))}
        </ul>
    );
};

export default Messages;
