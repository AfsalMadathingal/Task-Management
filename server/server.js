import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import { isAuth } from './utils/jwt.js';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Adjust to your React app's domain
        methods: ['GET', 'POST'],
    },
});

app.set('socketio', io); 

io.on('connection', (socket) => {

    console.log('A user connected:', socket.id);

    socket.on('registerUser', (userId) => {
        socket.join(userId); // Join a room identified by the user's ID
        console.log(`User ${userId} has joined room: ${userId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});




app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoute);
app.use('/api/user',isAuth, userRoute);


await connectDB();

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port http://localhost:3000');
});