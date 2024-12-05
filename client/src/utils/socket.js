import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL); // Backend URL

// Function to register the user with their ID
export const registerUser = (userId) => {
    socket.emit('registerUser', userId);
};

export default socket;
