import React, {useEffect, useRef, Dispatch, SetStateAction} from "react";
import {toast} from "react-toastify";
import {getSocket} from "../../../socket.ts";
import axios from "axios";
import {ChatIcon} from "./icons";

interface Data {
    sender?: string;
    receiver?: string | null;
    message: string;
    createdAt: string;
    channel: string;
}

interface Props {
    selectedChannel: string | null;
    setSelectedChannel: (channel: string | null) => void;
    messages: Data[];
    setMessages: Dispatch<SetStateAction<Data[]>>;
    className?: string;
}

const ChatBody: React.FC<Props> = ({
                                       className,
                                       selectedChannel,
                                       setSelectedChannel,
                                       messages,
                                       setMessages,
                                   }) => {
    const socket = getSocket();
    const username = localStorage.getItem("username");
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.on("message", (data: Data) => {
            setMessages((prevMessages: Data[]) => [...prevMessages, data]);
        });

        socket.on("leaveChannel", (channelName: string) => {
            setMessages((prevMessages: Data[]) => {
                if (
                    prevMessages.length > 0 &&
                    prevMessages[0].channel === channelName
                ) {
                    setSelectedChannel(null);
                    return [];
                } else {
                    return prevMessages;
                }
            });
        });

        socket.on("serverResponse", (message) => {
            toast.success(message);
        });

        socket.on("showCommands", (message) => {
            toast.info(message);
        });

        return () => {
            socket.off("message");
            socket.off("serverResponse");
            socket.off("showCommands");
            socket.off("leaveChannel");
        };
    }, [socket, setMessages, setSelectedChannel]);

    useEffect(() => {
        if (selectedChannel) {
            fetchMessages();
        }
    }, [selectedChannel]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    async function fetchMessages() {
        axios
            .get(`http://localhost:8080/api/message/${selectedChannel}/${username}`, {
                withCredentials: true,
            })
            .then((res) => {
                setMessages(res.data);
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    function formatTime(timestamp: string) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    }

    return (
        <div
            className={`${className} flex-grow overflow-y-auto scrollbar-webkit dark:scrollbar-webkit-dark bg-white transition-all duration-200 dark:bg-[#262e35]`}
        >
            {!selectedChannel ? (
                <div className="flex flex-col justify-center gap-y-4 items-center h-full">
                    <div className="flex items-center justify-center w-32 h-32 py-2 px-4 rounded-full bg-[#7a7f9a] dark:bg-[#7a7f9a] duration-200">
                        <ChatIcon className="stroke-white w-20 h-auto"/>
                    </div>
                    <h1 className="text-2xl text-white text-center py-2 px-4 rounded-full bg-[#7a7f9a] dark:bg-[#7a7f9a] font-bold duration-200">
                        Start conversation
                    </h1>
                </div>
            ) : (
                <>
                    {messages.map(
                        (data, index) =>
                            selectedChannel === data.channel &&
                            (data.sender !== username ? (
                                <div key={index} className="w-[70%] flex flex-col mt-4 mb-2">
                                    <label className="ml-5 text-xs mb-[3px] dark:text-[#a6b0cf] duration-200">
                                        {data.sender}
                                    </label>
                                    <div className="flex flex-wrap">
                                        <p
                                            className={`overflow-hidden break-words my-1 ml-3 px-5 py-3 mt-[-2px]
                                        ${
                                                data.receiver
                                                    ? "italic"
                                                    : "not-italic"
                                            }
                                        rounded-b-xl rounded-r-xl bg-[#7269ef] text-md text-white`}
                                        >
                                            {data.message}
                                        </p>
                                    </div>
                                    <label className="ml-5 mt[-2px] text-xs dark:text-[#a6b0cf] duration-200">
                                        {formatTime(data.createdAt)}
                                    </label>
                                </div>
                            ) : (
                                <div key={index} className="flex justify-end mt-4 mb-2">
                                    <div className="w-[70%] justify-end">
                                        <div className="flex flex-wrap justify-end">
                                            <p className="overflow-hidden break-words my-2 mr-3 px-5 py-3 duration-200 rounded-t-xl rounded-l-xl bg-[#f5f7fb] dark:bg-[#36404a] text-black text-md dark:text-white">
                                                {data.message}
                                            </p>
                                        </div>
                                        <div className="flex justify-end mr-5 mt[-2px] ml-6">
                                            <label className="text-xs dark:text-[#a6b0cf] duration-200">
                                                {formatTime(data.createdAt)}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ))
                    )}
                    <div ref={chatEndRef}/>
                </>
            )}
        </div>
    );
};

export default ChatBody;
