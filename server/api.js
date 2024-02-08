const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const socketSetup = require('./socketSetup');

dotenv.config();
const PORT = process.env.PORT || 4000;
const mongoURL = process.env.MONGO_URL;

const app = express();
const server = http.Server(app);

mongoose.connect(mongoURL).then(function () {
  console.log('Connected to MongoDB');
});

const userRoutes = require('./routes/user');
const verifyToken = require('./routes/verifyToken');

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));
app.use('/user', userRoutes);
app.use('/verifyToken', verifyToken);

socketSetup(server);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});