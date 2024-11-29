import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';


const app = express();

app.use(cors());



app.get('/', (req, res) => {
    res.send('Hello World!');
});


await connectDB();

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});