import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
import {getSocket} from "../../../socket.ts";
import PopupWindow from "./components/PopupWindow.tsx";
import axios from "axios";

interface Props {
    selectedChannel: string | null;
    setSelectedChannel: (channel: string | null) => void;
    channels: string[];
    setChannels: React.Dispatch<React.SetStateAction<string[]>>;
    className?: string;
}

const Channel: React.FC<Props> = ({
                                      className,
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

    const selectChannel = (channel: string) => {
        setSelectedChannel(channel);
        console.log("Selected channel:", selectedChannel);
        const data = {
            sender: username,
            message: "/users " + channel,
        };

        socket.emit("message", data);
    };

    const createJoinChannel = async (channelName: string) => {
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
                {withCredentials: true}
            );

            setChannels((prevChannels) => [...prevChannels, channelName]);
            setNewChannel("");
            toast.success(`Joined ${channelName}`);
        } catch (err: any) {
            toast.error(err.response.data.message);
        }
    };

    useEffect(() => {
        const leaveChannel = (channelName: string) => {
            setChannels((prevChannels: string[]) =>
                prevChannels.filter((channel) => channel !== channelName)
            );
        };

        socket.on("joinChannel", createJoinChannel);
        socket.on("leaveChannel", leaveChannel);

        return () => {
            socket.off("joinChannel", createJoinChannel);
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

    return (
        <div
            className={`${className} overflow-y-auto scrollbar-webkit dark:scrollbar-webkit-dark transition-colors duration-200 text-[#495057] dark:text-[#e1e9f1]`}
        >
            {channels.length > 0 && (
                <div className="m-3 justify-between items-center space-y-1">
                    {channels.map((channel, index) => (
                        <div key={index} className="flex gap-x-3">
                            <div
                                className={`relative flex-grow p-3.5 cursor-pointer rounded text-left text-md hover:bg-[#e6ebf5] duration-200 dark:hover:bg-[#36404a] ${
                                    selectedChannel === channel
                                        ? "bg-[#e6ebf5] dark:bg-[#36404a]"
                                        : "bg-[#f5f7fb] dark:bg-[#303841]"
                                }`}
                                onClick={() => selectChannel(channel)}
                            >
                                {channel}

                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                                    <button
                                        className="px-2 bg-red-500 hover:bg-red-700 text-white text-center rounded"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeChannel(channel);
                                        }}
                                    >
                                        Quit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <PopupWindow className="flex flex-col items-center mb-2" title="Add Channel"
                         onClickChannelButton={handleJoinChannel} textButton="Add Channel" buttonText="+">
                <label className="mb-1 text-[#495057] text-sm" htmlFor="channel">Channel Name</label>
                <input
                    className="w-80 py-2 px-4 rounded outline-none text-[#7a7f9a] placeholder-[#7a7f9a] dark:text-[#a6b0cf] text-sm bg-[#ffffff] border border-[#f0eff5] dark:border-[#36404a] focus:border-[#b9b4f7] dark:focus:border-[#3f4a56] dark:bg-[#2b3141] duration-300"
                    placeholder="Enter Channel Name"
                    value={newChannel}
                    onChange={(e) => setNewChannel(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleJoinChannel()}
                />
            </PopupWindow>
        </div>
    );
};

export default Channel;
