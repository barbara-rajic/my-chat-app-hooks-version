import React from "react";

const Message = ({ message, currentMember }) => {
    const isMessageFromCurrentMember = message.member.id === currentMember.id;

    return (
        <li
            className={`Messages-message ${
                isMessageFromCurrentMember ? "currentMember" : ""
            }`}
        >
            <span
                className="avatar"
                style={{ backgroundColor: message.member.clientData.color }}
            />
            <div className="Message-content">
                <div className="username">
                    {message.member.clientData.userName}
                </div>
                <div className="text">{message.text}</div>
            </div>
        </li>
    );
};

export default Message;
