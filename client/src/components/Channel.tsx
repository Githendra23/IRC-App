import { useState } from "react";
import { toast } from "react-toastify";

const Channel = ({ selectedChannel, setSelectedChannel }) => {
  const [channels, setChannels] = useState<string[]>([]);
  const [newChannel, setNewChannel] = useState("");
  //const [selectedChannel, setSelectedChannel] = useState(null);

  const handleJoinChannel = () => {
    const channelName = newChannel.trim();

    if (channelName === "") {
      toast.error("Please enter a channel name");
    } else if (channels.includes(channelName)) {
      toast.error(`${channelName} already exists`);
    } else {
      setChannels([...channels, channelName]);
      setNewChannel("");
      toast.success(`Joined ${channelName}`);
    }
  };

  const handleChannelNameChange = (e: { target: { value: string } }) => {
    setNewChannel(e.target.value);
  };

  function selectChannel(channel: string) {
    setSelectedChannel(channel);
    console.log("Selected channel:", channel);
  }

  return (
    <div className="flex flex-col">
      <h1 className="flex justify-center text-3xl font-bold">Channels</h1>
      <div className="flex flex-col items-center">
        <input
          className="mt-7 w-[90%] p-2 border border-gray-300 rounded bg-neutral-300 text-black dark:text-[#09ebe3] dark:bg-[#004449]"
          placeholder="Enter Channel Name"
          value={newChannel}
          onChange={handleChannelNameChange}
        />
        <button
          className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleJoinChannel}
        >
          Create/Join Channel
        </button>
      </div>

      {channels.length > 0 && (
        <div className="pl-4 pt-4">
          {channels.map((channel, index) => (
            <div
              key={index}
              className={`border-b border-gray-100 py-2 dark:border-gray-600 cursor-pointer 
                ${
                  selectedChannel === channel
                    ? "bg-blue-100 dark:bg-[#004449]"
                    : "hover:bg-blue-100 dark:hover:bg-[#004449] "
                }`}
              onClick={() => selectChannel(channel)}
            >
              {channel}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Channel;
