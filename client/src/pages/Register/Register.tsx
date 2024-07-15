import React, {useRef, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AccountIcon, LockIcon, MailIcon} from "../icons";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const navigate = useNavigate();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        if (username && password && repeatPassword && password === repeatPassword) {
            axios.post("http://localhost:8080/api/user/register", {
                username,
                email,
                password
            })
                .then(() => {
                    navigate('/login');
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
        }
        else {
            toast.error("Please enter a username, email and password");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-[#f7f7ff] font-inter">
            <h1 className="text-2xl text-center font-semibold mb-2 text-[#495057]">Sign Up</h1>
            <h2 className="text-sm mb-6 text-[#7f7f9a]">Get your account now.</h2>

            <div className="flex flex-col bg-white rounded p-10">
                <form className="flex flex-col w-80 gap-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="mb-1 text-[#495057]" htmlFor="username">Username</label>
                        <div className="flex">
                            <div className="flex items-center px-2 border border-[#e6ebf5] rounded-l bg-[#f7f7ff]">
                                <AccountIcon className="w-3.5 stroke-[#7a7f9a]"/>
                            </div>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder="Username"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        (emailInputRef.current as HTMLInputElement).focus();
                                    }
                                }}
                                className="w-full py-3 px-5 border-y border-r border-y-[#e6ebf5] border-r-[#e6ebf5] rounded-r bg-[#f7f7ff] bg-none outline-none text-sm text-[#7a7f9a]"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-[#495057]" htmlFor="email">Email</label>
                        <div className="flex">
                            <div className="flex items-center px-2 border border-[#e6ebf5] rounded-l bg-[#f7f7ff]">
                                <MailIcon className="w-3.5 stroke-[#7a7f9a]"/>
                            </div>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                                ref={emailInputRef}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        (passwordInputRef.current as HTMLInputElement).focus();
                                    }
                                }}
                                className="w-full py-3 px-5 border-y border-r border-y-[#e6ebf5] border-r-[#e6ebf5] rounded-r bg-[#f7f7ff] bg-none outline-none text-sm text-[#7a7f9a]"
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Create password"
                                ref={passwordInputRef}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        (confirmPasswordInputRef.current as HTMLInputElement).focus();
                                    }
                                }}
                                className={`w-full py-3 px-5 border-y border-r border-y-[#e6ebf5] border-r-[#e6ebf5] rounded-r bg-[#f7f7ff] bg-none outline-none text-sm text-[#7a7f9a] ${
                                    password !== repeatPassword ? "border-red-500" : ""
                                }`}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-[#495057]" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="flex">
                            <div
                                className="flex items-center px-2 border border-[#e6ebf5] rounded-l bg-[#f7f7ff]">
                                <LockIcon className="w-3.5 stroke-[#7a7f9a]"/>
                            </div>
                            <input
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                type="password"
                                placeholder="Confirm password"
                                ref={confirmPasswordInputRef}
                                onKeyDown={(e) => {
                                    if (e.key !== "Enter") return;
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                                className={`w-full py-3 px-5 border-y border-r border-y-[#e6ebf5] border-r-[#e6ebf5] rounded-r bg-[#f7f7ff] bg-none outline-none text-sm text-[#7a7f9a] ${
                                    password !== repeatPassword ? "border-red-500" : ""
                                }`}
                                required
                            />
                        </div>
                    </div>

                    <button className="p-2 bg-[#7269ef] hover:bg-[#6159cb] text-white rounded">
                        Sign Up
                    </button>
                </form>
            </div>

            <p className="mt-10 text-sm text-[#495057]">
                Already have an account?&nbsp;
                <a className="hover:cursor-pointer hover:underline hover:underline-offset-2 text-center text-[#7269ef]"
                   onClick={() => navigate("/login")}>
                    Sign in
                </a>
            </p>
        </div>
    );
};

export default Register;
