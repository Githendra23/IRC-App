const express = require('express');
const Message = require('../models/messageModel');
const router = express.Router();
const { getChannel } = require('./channel');
const { getUserById } = require('./user');

const verifyToken = require('./verifyToken');

router.get('/:channel/:username', async (req, res) => {
    try {
        const { channel, username } = req.params;
        const channelId = await getChannel(channel);
        const messages = await getMessages(channelId._id);

        const messagesWithUserNames = await Promise.all(messages.map(async message => {
            const sender = await getUserById(message.senderId);
            const receiver = await getUserById(message.receiverId);

            if (sender.username === username || !receiver || receiver.username === username) {
                const formattedMessage = {
                    sender: sender.username,
                    receiver: receiver ? receiver.username : null,
                    createdAt: new Date(message.createdAt),
                    message: message.message,
                    channel: channelId.name
                };

                return formattedMessage;
            }
        }));
        const filteredMessages = messagesWithUserNames.filter(message => message !== null && message !== undefined);
        // console.log(filteredMessages);
        return res.status(200).json(filteredMessages);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { senderId, sender, receiver, message, isPrivate } = req.body;
        const newMessage = await Message.create({ senderId, sender, receiver, message, isPrivate });
        return res.status(201).json(newMessage);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

function getMessages(channel) {
    return Message.find({ channelId: channel });
}

module.exports = router;