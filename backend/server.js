import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';

// app config
const app = express();
const port = 4000;

// db connection
connectDB()

// middleware
app.use(express.json())
app.use(cors());

// defind API endpoint
app.get("/", (req, res) => {
    res.send("API working")
})

// start server with port
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
})