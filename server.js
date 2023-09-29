import express from 'express';
import 'dotenv/config.js'
import ConnectDB from './src/model/connectDB.js'
import cors from 'cors'
import authRouter from './src/routers/auth.js'
import postRouter from './src/routers/post.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

ConnectDB();
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.get('/', (req, res) => {
    res.send('hele')
})

const port = process.env.PORT
app.listen(port, () => {
    console.log('port runing ', port);
})