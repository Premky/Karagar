import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import express from 'express';
import cors from 'cors';
import Jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { adminRouter } from './Routes/AdminRoute.js';
import { displayRouter } from './Routes/DisplayRoute.js';

const app = express();

// Get the directory name from the URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://karagar.onrender.com',
            'http://192.168.1.16:5173'
        ];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials such as cookies
}));

app.use(express.json());
app.use(cookieParser());
app.use('/display', displayRouter);
app.use('/auth', adminRouter);


app.use(express.static('Public'));

// Serve files from the 'Public/Uploads' directory
// app.use('/Uploads', express.static(path.join(__dirname, 'Public/Uploads')));
app.use('/Uploads', express.static(path.join(__dirname, 'Public','Uploads')));

app.listen(3001, () => {
    console.log("Server is running");
});
