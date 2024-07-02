import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getSocket } from "../../../socket.ts";
import PopupWindow from "./components/PopupWindow.tsx";
import axios from "axios";
import MessageIcon from "./icons/MessageIcon";

interface Props {
    selectedChannel: string | null;
    setSelectedChannel: (channel: string | null) => void;
    channels: string[];
    setChannels: React.Dispatch<React.SetStateAction<string[]>>;
}

const Channel: React.FC<Props> = ({
                                      channels,
                                      setChannels,
                                      selectedChannel,
                                      setSelectedChannel,
                                  }) => {
    const [newChannel, setNewChannel] = useState("");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const socket = getSocket();

    const handleJoinChannel = async () => {
        const channelName = newChannel.trim();

        if (channelName === "") toast.error("Please enter a channel name");
        else if (channels.includes(channelName))
            toast.error(`${channelName} already exists`);
        else {
            const data = {
                sender: username,
                message: "/join " + channelName,
            };

            socket.emit("message", data);
        }
    };

    const handleChannelNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewChannel(e.target.value);
    };

    const selectChannel = (channel: string) => {
        setSelectedChannel(channel);
        console.log("Selected channel:", selectedChannel);
        const data = {
            sender: username,
            message: "/users " + channel,
        };

        socket.emit("message", data);
    };

    const createChannel = async (channelName: string) => {
        if (!userId) {
            console.error("userId is null");
            return;
        }

        try {
            await axios.post(
                "http://localhost:8080/api/channel",
                {
                    channelName: channelName,
                    userId: userId,
                },
                { withCredentials: true }
            );

            setChannels((prevChannels) => [...prevChannels, channelName]);
            setNewChannel("");
            toast.success(`Joined ${channelName}`);
        }
        catch (err: any) {
            toast.error(err.response.data.message);
        }
    };

    useEffect(() => {
        const joinChannel = (channelName: string) => {
            createChannel(channelName);
        };

        const leaveChannel = (channelName: string) => {
            setChannels((prevChannels: string[]) =>
                prevChannels.filter((channel) => channel !== channelName)
            );
        };

        socket.on("joinChannel", joinChannel);
        socket.on("leaveChannel", leaveChannel);

        return () => {
            socket.off("joinChannel", joinChannel);
            socket.off("leaveChannel", leaveChannel);
        };
    }, []);

    const removeChannel = (channelName: string) => {
        socket.emit("message", {
            sender: username,
            message: `/quit ${channelName}`,
            channel: selectedChannel,
        });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;
        handleJoinChannel();
    };

    return (
        <div className="transition-colors duration-100 text-[#495057] dark:text-[#e1e9f1]">
            <div className="flex w-full gap-x-2 py-4 mb-2 items-center justify-center border-b border-gray-700">
                <MessageIcon className="w-8 h-8 items-center" />
                <h2 className="text-xl lg:text-3xl font-bold">Channels</h2>
            </div>

            {channels.length > 0 && (
                <div>
                    {channels.map((channel, index) => (
                        <div key={index} className="flex">
                            <div
                                className={`flex-1 mx-1 my-0.5 p-3.5 cursor-pointer rounded text-left text-md
                                ${
                                    selectedChannel === channel
                                        ? "bg-[#e6ebf5] dark:bg-[#36404a]"
                                        : "bg-[#f5f7fb] dark:bg-[#303841]"
                                }`}
                                onClick={() => selectChannel(channel)}
                            >
                                {channel}
                            </div>
                            <div className="flex justify-center items-center mr-1">
                                <button
                                    className="px-2 bg-red-500 hover:bg-red-700 text-white text-center rounded"
                                    onClick={() => removeChannel(channel)}
                                >
                                    Quit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex flex-col items-center">
                <PopupWindow buttonText="+">
                    <input
                        className="w-full mb-1 p-2 rounded focus:outline-none text-[#7a7f9a] transition-all duration-100 dark:text-[#a6a7be] bg-[#e6ebf5] dark:bg-[#36404a]"
                        placeholder="Enter Channel Name"
                        value={newChannel}
                        onChange={handleChannelNameChange}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className="flex mt-1 bg-[#7269ef] text-white text-center py-2 px-4 rounded-lg"
                        onClick={handleJoinChannel}
                    >
                        Create/Join
                    </button>
                </PopupWindow>
            </div>
        </div>
    );
};

export default Channel;
