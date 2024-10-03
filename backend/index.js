import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import marksheetRoutes from './routes/marksheetRoutes.js';
import { PORT, mongoURI } from './config.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Ensure this is present

// Routes
app.use('/admin', adminRoutes); 
app.use('/courses', courseRoutes);
app.use('/marksheets', marksheetRoutes); // Add the marksheet routes

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
