import React, {useEffect, Dispatch, SetStateAction} from "react";
import {toast} from "react-toastify";
import {getSocket} from "../../socket.ts";
import Typing from "./Typing.tsx";

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
}

const ChatBody: React.FC<Props> = ({selectedChannel, setSelectedChannel, messages, setMessages}) => {
    const socket = getSocket();
    const username = localStorage.getItem("username");

    useEffect(() => {
        socket.on("message", (data: Data) => {
            setMessages((prevMessages: Data[]) => [...prevMessages, data]);
            console.log("data received from socket :", data);
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
    }, [socket, setMessages]);

    useEffect(() => {
        if (selectedChannel) {
            fetchMessages();
        }
    }, [selectedChannel]);

    async function fetchMessages() {
        await fetch(
            `http://localhost:4000/message/${selectedChannel}/${username}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
            });
    }

    function formatTime(timestamp: string) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    }

    return (
        <>
            <div
                className="h-[85vh] w-full bg-neutral-200 text-black dark:text-[#09ebe3] dark:bg-[#043a44] border border-black flex flex-col-reverse -auto overflow-x-hidden scrollbar-thin dark:scrollbar-track-[#09ebe42a] dark:scrollbar-thumb-[#09ebe3]">
                <div>
                    {!selectedChannel && (
                        <div className="flex justify-center items-center h-[85vh]">
                            <h1 className="text-3xl mx-2 text-center font-bold text-black dark:text-[#09ebe3]">
                                Select a channel to start chatting
                            </h1>
                        </div>
                    )}

                    {selectedChannel && (
                        <>
                            {messages.map((data, index) =>
                                data.sender !== username ? (
                                    <div key={index} className="w-[70%] flex flex-col mt-4 mb-2">
                                        <label className="ml-5 text-sm mb-[3px]">
                                            {data.sender}
                                        </label>
                                        <div className="flex flex-wrap">
                                            <p
                                                className={`text-lg overflow-hidden break-words border my-1 ml-3 px-5 py-3 mt-[-2px] ${
                                                    data.receiver ? "italic" : "not-italic"
                                                } border-[#0a2b03] rounded-[30px] bg-[#2f941a] text-white`}
                                            >
                                                {data.message}
                                            </p>
                                        </div>
                                        <label className="ml-5 mt[-2px] text-sm">
                                            {formatTime(data.createdAt)}
                                        </label>
                                    </div>
                                ) : (
                                    <div key={index} className="flex justify-end mt-4 mb-2">
                                        <div className="w-[70%] justify-end">
                                            <div className="flex flex-wrap justify-end">
                                                <p className="text-lg overflow-hidden break-words border my-2 mr-3 px-5 py-3 border-[#03252b] rounded-[30px] bg-[#1356bb] text-white">
                                                    {data.message}
                                                </p>
                                            </div>

                                            <div className="flex justify-end mr-5 mt[-2px] ml-6">
                                                <label className="text-sm">
                                                    {formatTime(data.createdAt)}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </>
                    )}
                </div>

                <Typing/>
            </div>
        </>
    );
};

export default ChatBody;
