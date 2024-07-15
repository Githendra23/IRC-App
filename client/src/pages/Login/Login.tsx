import React, {useState} from "react";
import {getSocket, connect, isConnected} from "../socket.ts";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AccountIcon, LockIcon} from "./icons";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [connected, setConnected] = useState(isConnected());
    const navigate = useNavigate();

    const handleConnect = async (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        if (!connected && username.trim() !== "" && password.trim() !== "") {
            axios.post("http://localhost:8080/api/user/login", {
                username: username,
                password: password
            }, {withCredentials: true})
                .then((res) => {
                    connect();

                    const socket = getSocket();
                    localStorage.setItem("username", username);
                    localStorage.setItem("userId", res.data.userId);
                    localStorage.setItem("password", String(password.length));

                    socket.on("connect", () => {
                        socket.emit("newUser", username);
                        toast.success(`${username} connected to server`);

                        socket.on("userJoined", (username) => {
                            console.log(`${username} joined the chat`);
                            toast.info(`${username} joined the chat`);
                        });
                    });

                    navigate("/chatrooms");
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        } else {
            toast.error("Please enter a username");
        }

        setConnected(isConnected());
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;

        handleConnect();
    };

    return (
        <>
            {!connected && (
                <div className="flex flex-col justify-center items-center h-screen bg-[#f7f7ff] font-inter">
                    <h1 className="text-2xl text-center font-semibold mb-2 text-[#495057]">Sign in</h1>
                    <h2 className="text-sm mb-6 text-[#7f7f9a]">Sign in to continue.</h2>

                    <div className="flex flex-col bg-white rounded p-10">
                        <form className="flex flex-col w-80 gap-8" onSubmit={handleConnect}>
                            <div className="flex flex-col">
                                <label className="mb-1 text-[#495057]" htmlFor="username">Username</label>
                                <div className="flex">
                                    <div className="flex items-center px-2 border border-[#e6ebf5] rounded-l bg-[#f7f7ff]">
                                        <AccountIcon className="w-3.5 stroke-[#7a7f9a]"/>
                                    </div>
                                    <input
                                        className="w-full py-3 px-5 border-y border-r border-y-[#e6ebf5] border-r-[#e6ebf5] rounded-r bg-[#f7f7ff] bg-none outline-none text-sm text-[#7a7f9a]"
                                        type="text"
                                        placeholder="Enter Username"
                                        value={username}
                                        onKeyDown={handleKeyPress}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-[#495057]" htmlFor="password">Password</label>
                                <div className="flex">
                                    <div
                                        className="flex items-center px-2 border border-[#e6ebf5] rounded-l bg-[#f7f7ff]">
                                        <LockIcon className="w-3.5 stroke-[#7a7f9a]"/>
                                    </div>
                                    <input
                                        className="w-full py-3 px-5 border-y border-r border-y-[#e6ebf5] border-r-[#e6ebf5] rounded-r bg-[#f7f7ff] bg-none outline-none text-sm text-[#7a7f9a]"
                                        type="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onKeyDown={handleKeyPress}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <button className="p-2 bg-[#7269ef] hover:bg-[#6159cb] text-white rounded">
                                Sign In
                            </button>
                        </form>
                    </div>

                    <p className="mt-10 text-sm text-[#495057]">
                        Don't have an account?&nbsp;
                        <a className="hover:cursor-pointer hover:underline hover:underline-offset-2 text-center text-[#7269ef]"
                           onClick={() => navigate("/register")}>
                            Sign up now
                        </a>
                    </p>
                </div>
            )}
        </>
    );
};

export default Login;
