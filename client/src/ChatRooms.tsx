import { useEffect, useState } from "react";
import { getSocket, disconnect, isConnected } from "./socket";
import Input from "./components/Input";
import App from "./App";
import { toast } from "react-toastify";
import ChatBody from "./components/ChatBody";
import ActiveUser from "./components/ActiveUser";
import Channel from "./components/Channel";
import ThemeButton from "./components/ThemeButton";
import { useNavigate } from "react-router-dom";

const ChatRooms = () => {
  const [connected, setConnected] = useState(isConnected());
  const username = localStorage.getItem("username");

  const [selectedChannel, setSelectedChannel] = useState(null);

  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const socket = getSocket();

    if (!isConnected()) {
      logOut();
      socket.emit("disconnect");
    }

    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });
  }, []);

  const logOut = () => {
    disconnect();
    toast.success("Logged out");
    localStorage.removeItem("username");
    setConnected(isConnected());
    navigate("/");
    /*axios.post("/logout").then(() => {
      setId(null);
      setUsername(null);
    });*/
  };

  return (
    <div className="scrollbar-thin dark:scrollbar-track-[#09ebe42a] dark:scrollbar-thumb-[#09ebe3]">
      {connected ? (
        <div className="flex bg-black h-screen">
          <div className="w-1/5 m-2 text-black dark:text-[#09ebe3] dark:bg-[#03252b] bg-white rounded">
            <Channel
              selectedChannel={selectedChannel}
              setSelectedChannel={setSelectedChannel}
            />
          </div>

          <div className="w-3/5 my-2 flex flex-col text-black dark:text-[#09ebe3] dark:bg-[#05323a] bg-white rounded justify-center items-start">
            <div className="flex justify-between w-full px-2 pt-2">
              <h1 className="text-3xl font-bold text-black dark:text-[#09ebe3]">
                Welcome {username}
              </h1>

              <div>
                <ThemeButton />

                <button
                  className="p-2 bg-red-500 hover:bg-red-700 text-white rounded"
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="mt-2 flex flex-col w-full">
              <ChatBody
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
                messages={messages}
                setMessages={setMessages}
              />
              <div className="mt-1 p-2">
                <Input
                  selectedChannel={selectedChannel}
                  setSelectedChannel={setSelectedChannel}
                  messages={messages}
                  setMessages={setMessages}
                />
              </div>
            </div>
          </div>
          <div className="w-1/5 m-2 text-black dark:text-[#09ebe3] dark:bg-[#03252b] bg-white rounded">
            <ActiveUser />
          </div>
        </div>
      ) : (
        <App />
      )}
    </div>
  );
};

export default ChatRooms;
