import React, {useState, useEffect} from "react";
import {toast} from "react-toastify";
import {getSocket} from "../../../socket.ts";
import PopupWindow from "./components/PopupWindow.tsx";
import axios from "axios";
import LeaveIcon from "./icons/LeaveIcon.tsx";
import {ChatIcon} from "../../icons";

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
    const [isPopupOpen, setPopupOpen] = useState(false);

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
                    channelName,
                    userId,
                },
                {withCredentials: true}
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
        <div className={className}>
            <div
                className="flex justify-between p-5 items-center transition-colors duration-200 text-[#495057] dark:text-[#e1e9f1] border-b-[1px] border-b-[#f0effc] dark:border-b-[#36404a] mb-6">
                <h4 className="text-xl font-bold">Channels</h4>
                <button onClick={() => setPopupOpen(true)} className="relative w-5 group">
                    <ChatIcon className="stroke-[#495057] dark:stroke-[#9aa1b9] w-full"/>

                    <div
                        className="absolute right-1/2 translate-x-1/2 top-8 bg-black py-2 px-3 rounded-md text-white
                            scale-0 transition duration-200 group-hover:scale-100 pointer-events-none"
                    >
                        <p className="whitespace-nowrap text-sm">Create/Join Room</p>

                        <svg
                            className="absolute right-1/2 translate-x-1/2 -top-[0.4rem] -rotate-0 w-3"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <title>triangle-filled</title>
                                <g
                                    id="Page-1"
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                >
                                    <g
                                        id="drop"
                                        fill="#000000"
                                        transform="translate(32.000000, 42.666667)"
                                    >
                                        <path
                                            d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z"
                                            id="Combined-Shape"
                                        ></path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </button>
            </div>

            <PopupWindow className="flex flex-col items-center mt-2" isOpen={isPopupOpen} setIsOpen={setPopupOpen} title="Add Channel"
                         onClickChannelButton={handleJoinChannel} textButton="Add Channel">
                <label className="mb-1 text-[#495057] dark:text-[#a6b0cf] text-sm" htmlFor="channel">Channel
                    Name</label>
                <input
                    className="w-80 py-2 px-4 rounded outline-none text-[#7a7f9a] placeholder-[#7a7f9a] dark:placeholder-[#a6b0cf] dark:text-[#a6b0cf] text-sm bg-[#ffffff] border border-[#f0eff5] dark:border-[#36404a] focus:border-[#b9b4f7] dark:focus:border-[#3f4a56] dark:bg-[#2b3141] duration-300"
                    placeholder="Enter Channel Name"
                    value={newChannel}
                    onChange={(e) => setNewChannel(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleJoinChannel()}
                />
            </PopupWindow>

            <div
                className={`px-6 overflow-y-auto scrollbar-webkit dark:scrollbar-webkit-dark transition-colors duration-200 text-[#495057] dark:text-[#e1e9f1]`}
            >
                {channels.length > 0 && (
                    <div className="justify-between items-center space-y-0.5">
                        {channels.map((channel, index) => (
                            <button
                                className={`relative flex-grow py-4 w-full px-5 rounded text-left text-md hover:bg-[#e6ebf5] transition-colors duration-200 dark:hover:bg-[#36404a] ${
                                    selectedChannel === channel
                                        ? "bg-[#e6ebf5] dark:bg-[#36404a]"
                                        : "bg-[#f5f7fb] dark:bg-[#303841]"
                                }`}
                                key={index}
                                onClick={() => selectChannel(channel)}
                            >
                                {channel}

                                <div
                                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center px-2 py-1 bg-white dark:bg-[#313a43] border border-[#f0eff5] shadow dark:shadow-none dark:border-[#36404a] text-white text-center rounded transition-colors duration-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeChannel(channel);
                                    }}
                                >
                                    <LeaveIcon
                                        className="stroke-red-500 hover:stroke-red-600 rotate-180 w-5 h-auto duration-200"/>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Channel;
