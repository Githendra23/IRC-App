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
const server = http.createServer(app);

mongoose.connect(mongoURL)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB:', err);
      process.exit(1);
    });

const { userRoutes } = require('./routes/user');
const verifyToken = require('./routes/verifyToken');
const messageRoutes = require('./routes/message');
const { channelRoutes } = require('./routes/channel');

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:8000',
    'http://localhost:8010',
    'http://localhost:8020',
    'http://localhost:8030',
    'http://localhost:8040',
    'http://localhost:8050',
    'http://localhost:8060',
    'http://localhost:8070',
    'http://localhost:8080'
];

app.use(express.json());
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(cookieParser());

app.use('/user', userRoutes);
app.use('/verifyToken', verifyToken);
app.use('/message', messageRoutes);
app.use('/channel', channelRoutes);

socketSetup(server);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});