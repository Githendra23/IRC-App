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
                        className="py-2 px-4 flex-grow rounded-md mr-3 focus:outline-none text-[#7a7f9a] transition-colors duration-100 dark:text-[#a6a7be] bg-[#e6ebf5] dark:bg-[#36404a]"
                        placeholder="Enter Message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        className="py-2 px-4 bg-[#7269ef] hover:bg-[#6159cb] text-white rounded-md"
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
