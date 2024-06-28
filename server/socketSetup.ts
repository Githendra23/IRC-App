import {Server as SocketIOServer, Socket} from 'socket.io';
import {Server as HttpServer} from 'http';

const {getUser} = require('./routes/user');
const Message = require('./models/messageModel');
const {getChannel, isChannelOwner, deleteChannel} = require('./routes/channel');

interface Data {
    sender?: string;
    receiver?: string | null;
    message: string;
    createdAt: string;
    channel: string;
}

const socketSetup = (server: HttpServer) => {
    const socketIO = new SocketIOServer(server, {
        cors: {
            origin: '*',
        }
    });

    const activeUsers = new Map<string, string>();
    const activeUsersOnChannels = new Map<string, string[]>();

    socketIO.on('connection', (socket: Socket) => {
        socket.on('newUser', function (username: string) {
            console.log("user ".concat(username, " just connected!"));
            activeUsers.set(socket.id, username);

            activeUsersOnChannels.set(username, []);

            socket.broadcast.emit('userJoined', username);
            console.log('Current users:', activeUsers);

            // Convert activeUsers map to an array and emit it to the client
            const activeUsersArray = Array.from(activeUsers.values());
            socket.emit('activeUsers', activeUsersArray);
            socket.broadcast.emit('activeUsers', activeUsersArray);
        });

        socket.on('message', async (data: Data) => {
            const currentTime = new Date();

            const hours = currentTime.getHours() < 10 ? `0${currentTime.getHours()}` : currentTime.getHours();
            const minutes = currentTime.getMinutes() < 10 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes();

            console.log('Message received:', data);

            if (data.message[0] === "/") {
                const command = data.message.split(' ')[0];

                switch (command) {
                    case '/nick':
                        const newUsername = data.message.split(' ')[1];
                        const activeUsersArray = Array.from(activeUsers.values());

                        if (activeUsersArray.includes(newUsername)) {
                            return socket.emit('serverResponse', 'This username is already taken');
                        }

                        activeUsers.set(socket.id, newUsername);
                        console.log('activeUsers : ', activeUsers);
                        socket.emit('serverResponse', 'Username updated');
                        socket.broadcast.emit('activeUsers', activeUsersArray);
                        break;

                    case '/list':
                        var channels = Array.from(activeUsersOnChannels.keys());
                        socket.emit('serverResponse', `Channels: ${channels.join(', ')}`);
                        break;

                    case '/delete':
                        const user = await getUser(data.sender);
                        const userId = user._id;
                        var channelName = data.message.split(' ')[1] || data.channel;
                        var username = activeUsers.get(socket.id) as string;
                        const channelToDelete = await getChannel(channelName);
                        const channelId = channelToDelete._id;

                        const isOwner: boolean = isChannelOwner(channelId, userId);

                        if (isOwner) {
                            activeUsersOnChannels.forEach((channels, username) => {
                                const index = channels.indexOf(channelName);

                                if (index !== -1) {
                                    channels.splice(index, 1);
                                }
                            });

                            socket.emit('leaveChannel', channelName);
                            socket.broadcast.emit('leaveChannel', channelName);

                            deleteChannel(channelId);

                        } else {
                            socket.emit('serverResponse', "You do not have the necessary permissions to delete this channel");
                        }

                        break;

                    case '/join':
                        var channelName = data.message.split(' ')[1];
                        var username = activeUsers.get(socket.id) as string; // Add type assertion to ensure username is of type string
                        var channels = activeUsersOnChannels.get(username) || []; // Initialize with an empty array if undefined

                        if (!activeUsersOnChannels.get(username)?.includes(channelName)) {
                            channels.push(channelName);

                            activeUsersOnChannels.set(username, channels);
                            console.log({activeUsersOnChannels});
                            socket.join(channelName);
                            socket.emit('joinChannel', channelName);
                            socket.emit('activeUsersOnChannels', activeUsersOnChannels);
                            socket.broadcast.emit('activeUsersOnChannels', activeUsersOnChannels);
                        }
                        break;

                    case '/quit':
                        var channelName = data.message.split(' ')[1] || data.channel;
                        var username = activeUsers.get(socket.id) as string;
                        var channels = activeUsersOnChannels.get(username) || [];

                        const index = channels.indexOf(channelName);
                        if (index !== -1) {
                            channels.splice(index, 1);
                        }

                        activeUsersOnChannels.set(username, channels);
                        console.log({activeUsersOnChannels});
                        console.log(`User ${username} has quit.`);
                        socket.leave(channelName);
                        socket.emit('leaveChannel', channelName);
                        break;

                    case '/users':
                        const channel = data.message.split(' ')[1];
                        const users = getUsersInChannel(channel);
                        socket.emit('activeUsersOnChannels', users);
                        break;

                    case '/msg':
                        const messageParts = data.message.split(' ');

                        if (messageParts.length < 3) {
                            socket.emit('serverResponse', 'Invalid message format. Usage: /msg <receiver> <message>');
                            break;
                        }

                        const receiverUsername = data.message.split(' ')[1];
                        const senderUsername = data.sender;
                        const receiverSocketId = Array.from(activeUsers.entries()).find(([id, username]) => username === receiverUsername)?.[0];

                        if (receiverSocketId) {
                            if (senderUsername === receiverUsername) {
                                socket.emit('serverResponse', 'Cannot send private message to yourself');
                                return;
                            }

                            const receiverSocket = socketIO.sockets.sockets.get(receiverSocketId);
                            const privateMessage = data.message.split(' ').slice(2).join(' ');

                            if (receiverSocket) {
                                const message: Data = {
                                    sender: senderUsername,
                                    message: privateMessage,
                                    receiver: receiverUsername,
                                    createdAt: `${currentTime}`,
                                    channel: data.channel
                                };

                                console.log({receiverUsername, receiverSocketId, senderUsername});

                                receiverSocket.emit('message', message);
                                socket.emit('message', message);

                                const receiverId = await getUser(receiverUsername);
                                const senderId = await getUser(data.sender);
                                const channelId = await getChannel(data.channel);

                                await Message.create({
                                    senderId: senderId._id,
                                    receiverId: receiverId._id,
                                    message: privateMessage,
                                    channelId: channelId._id
                                })

                                socket.emit('serverResponse', `Message sent to ${receiverUsername}`);
                            } else {
                                socket.emit('serverResponse', 'User not found or offline');
                            }
                        } else {
                            socket.emit('serverResponse', 'User not found');
                        }
                        break;

                    case '/help':
                        socket.emit('showCommands', 'Available commands:\n - /nick <username>\n - /list\n - /delete <channel name>\n - /join <channel name>\n - /quit <channel name>\n - /users\n - /msg <username>');
                        break;

                    default:
                        socket.emit('serverResponse', "Command doesn't exist");
                }
            }
            else {
                const senderId = await getUser(data.sender);
                const channelId = await getChannel(data.channel);
                data.createdAt = `${currentTime}`;
                data.receiver = null;

                const newData = await Message.create({
                    senderId: senderId._id,
                    message: data.message,
                    channelId: channelId._id
                });

                console.log('newData :', newData);

                socket.emit('message', data);
                socket.to(data.channel).emit('message', data);
            }
        });

        socket.on('typing', (username: string) => {
            socket.broadcast.emit('typing', username);
        })

        socket.on('stopTyping', (username: string) => {
            socket.broadcast.emit('stopTyping', username);
        })

        socket.on('disconnect', function () {
            const username = activeUsers.get(socket.id);

            if (username) {
                console.log("user ".concat(username, " disconnected"));
                activeUsers.delete(socket.id);
                console.log('Current users:', activeUsers);
                socket.emit('userLeft', username);

                const activeUsersArray = Array.from(activeUsers.values());
                activeUsersOnChannels.delete(username);
                console.log('Active users array:', activeUsersOnChannels);
                socket.emit('activeUsers', activeUsersArray);
                socket.broadcast.emit('activeUsers', activeUsersArray);
            }
        });
    });

    function getUsersInChannel(channelName: string) {
        return Array.from(activeUsersOnChannels.entries())
            .filter(([username, channels]) => channels.includes(channelName))
            .map(([username, channels]) => username);
    }
}

module.exports = socketSetup;