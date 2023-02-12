import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './utils/connectDB.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute/main.js';
import loginRouter from './routes/loginRoute/main.js';
import registerRouter from './routes/registerRoute/main.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.get('/', (req, res) => {
    res.send({ message: "Welcome to the coin class membership id api" });
});

// app.get('*', (req, res) => {
//         res.status(400).send({ message: 'The endpoint you tried to access doesn\'t exist on this api' });
//     })
//     .post('*', (req, res) => {
//         res.status(400).send({ message: 'The endpoint you tried to access doesn\'t exist on this api' });
//     })
//     .patch('*', (req, res) => {
//         res.status(400).send({ message: 'The endpoint you tried to access doesn\'t exist on this api' });
//     })
//     .delete('*', (req, res) => {
//         res.status(400).send({ message: 'The endpoint you tried to access doesn\'t exist on this api' });
//     });

connectDB();

app.listen(PORT, (err) => {
    if (err) { res.send(err); return false; }

    console.log(`Server running on port ${PORT}`);
});