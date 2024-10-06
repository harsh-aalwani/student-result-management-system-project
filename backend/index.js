// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import adminRoutes from './routes/adminRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import marksheetRoutes from './routes/marksheetRoutes.js';
import { PORT, mongoURI } from './config.js';

const app = express();

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow both frontend URLs
    credentials: true, // Enable credentials for session cookies
};

// Middleware
app.use(cors(corsOptions)); // Use the cors options
app.use(express.json()); // Ensure this is present

// Session middleware
app.use(session({
    secret: 'ThisKeyShallProtectTheUserSession', // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // Session lasts for 1 day
}));

// Routes
app.use('/admin', adminRoutes);
app.use('/courses', courseRoutes);
app.use('/marksheets', marksheetRoutes);

// Connect to MongoDB
mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
