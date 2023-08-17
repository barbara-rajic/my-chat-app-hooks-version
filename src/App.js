import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import { randomName, randomColor } from "./RandomUtils";

const App = () => {
    const [member, setMember] = useState({
        userName: randomName(),
        color: randomColor(),
    });
    const [messages, setMessages] = useState([]);

    const drone = useRef(null);

    useEffect(() => {
        if (!drone.current) {
            // Ensure that the code runs only once during the component's lifecycle

            drone.current = new window.Scaledrone("OMgrGGyQjsnf91VC", {
                data: member,
            });
            drone.current.on("open", (error) => {
                if (error) {
                    return console.error(error);
                }
                const m = { ...member };
                m.id = drone.current.clientId;
                setMember(m);
            });

            drone.current
                .subscribe("observable-room")
                .on("message", (message) => {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            text: message.data,
                            member: message.member,
                            id: message.id,
                        },
                    ]);
                });
        }
    }, []);

    const onSendMessage = (message) => {
        drone.current.publish({
            room: "observable-room",
            message,
        });
    };

    return (
        <div className="App">
            <div className="App-header">
                <h1>My Chat App</h1>
            </div>
            <Messages messages={messages} currentMember={member} />
            <Input onSendMessage={onSendMessage} />
        </div>
    );
};

export default App;
