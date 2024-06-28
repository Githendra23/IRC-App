import React, {useState} from "react";
import {getSocket} from "../../../socket.ts";
import AirplaneIcon from "./icons/AirplaneIcon";

interface Props {
    selectedChannel: string | null;
}

const Input: React.FC<Props> = ({selectedChannel}) => {
    const [message, setMessage] = useState("");
    const socket = getSocket();
    const username = localStorage.getItem("username");

    const sendMessage = () => {
        if (message.trim() === "") return;

        socket.emit("message", {
            sender: username,
            message: message,
            channel: selectedChannel,
        });
        setMessage("");
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;

        sendMessage();
    };

    return (
        <div className="flex items-center">
            {selectedChannel && (
                <>
                    <input
                        type="text"
                        onKeyDown={handleKeyPress}
                        className="border border-black py-3 flex-grow rounded-md mr-2 pl-1 bg-neutral-300 text-black dark:text-[#09ebe3] dark:bg-[#004449]"
                        placeholder="Type here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        className="px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3"
                        onClick={sendMessage}
                    >
                        <AirplaneIcon className="w-6 h-6"/>
                    </button>
                </>
            )}
        </div>
    );
};

export default Input;
