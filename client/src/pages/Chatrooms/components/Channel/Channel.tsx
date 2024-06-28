import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
import {getSocket} from "../../../socket.ts";
import PopupWindow from "../PopupWindow.tsx";
import axios from "axios";
import MessageIcon from "./icons/MessageIcon";

interface Props {
    selectedChannel: string | null;
    setSelectedChannel: (channel: string | null) => void;
}

const Channel:React.FC<Props> = ({selectedChannel, setSelectedChannel}) => {
    const [channels, setChannels] = useState<string[]>([]);
    const [newChannel, setNewChannel] = useState("");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const socket = getSocket();

    const handleJoinChannel = async () => {
        const channelName = newChannel.trim();

        if (channelName.trim() === "") toast.error("Please enter a channel name");
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

    const handleChannelNameChange = (e: { target: { value: string } }) => {
        setNewChannel(e.target.value);
    };

    function selectChannel(channel: string) {
        setSelectedChannel(channel);
        console.log("Selected channel:", selectedChannel);
        const data = {
            sender: username,
            message: "/users " + channel,
        };

        socket.emit("message", data);
    }

    const createChannel = async (channelName: string) => {
        if (!userId) {
            console.error("userId is null");
            return;
        }

        axios.post("http://localhost:8080/api/channel", {
            channelName: channelName,
            userId: userId
        }, {withCredentials: true})
            .then(() => {
                setChannels((prevchannels) => [...prevchannels, channelName]);
                setNewChannel("");
                toast.success(`Joined ${channelName}`);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    useEffect(() => {
        const joinChannel = (channelName: string) => {
            createChannel(channelName);
        };

        const leaveChannel = (channelName: string) => {
            setChannels((prevChannels) =>
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
        <div>
            <div className="flex w-full gap-x-2 py-4 mb-2 items-center justify-center border-b border-gray-700">
                <MessageIcon className="w-8 h-8 items-center"/>
                <h2 className="text-xl lg:text-3xl font-bold">Channels</h2>
            </div>

            {channels.length > 0 && (
                <div className="">
                    {channels.map((channel, index) => (
                        <div className="flex">
                            <div
                                key={index}
                                className={`flex-1 mx-1 my-0.5 border-gray-100 p-3.5 dark:border-gray-600 cursor-pointer rounded-lg text-left text-lg
                                ${selectedChannel === channel
                                        ? "bg-blue-100 dark:bg-[#004449]"
                                        : "hover:bg-blue-100 dark:hover:bg-[#004449] "
                                }`}
                                onClick={() => selectChannel(channel)}
                            >
                                {channel}
                            </div>
                            <div className="flex justify-center items-center mr-1">
                                <button
                                    className="z-0 px-2 bg-red-500 hover:bg-red-700 text-white text-center rounded"
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
                        className=" w-full mb-1 p-2 rounded bg-neutral-300 text-black dark:text-[#09ebe3] dark:bg-[#004449]"
                        placeholder="Enter Channel Name"
                        value={newChannel}
                        onChange={handleChannelNameChange}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className="flex mt-1 bg-blue-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg"
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
