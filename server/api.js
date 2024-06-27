const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const socketSetup = require('./socketSetup');

dotenv.config();
const PORT = process.env.PORT || 4000;
const mongoURL = process.env.MONGO_URL;

const app = express();
const server = http.Server(app);

mongoose.connect(mongoURL).then(function () {
  console.log('Connected to MongoDB');
});

const { userRoutes } = require('./routes/user');
const verifyToken = require('./routes/verifyToken');
const messageRoutes = require('./routes/message');
const { channelRoutes } = require('./routes/channel');

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/verifyToken', verifyToken);
app.use('/message', messageRoutes);
app.use('/channel', channelRoutes);

socketSetup(server);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});