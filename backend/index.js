import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import { PORT, mongoURI } from './config.js'; // Import your DB connection config

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Ensure this is present
    
// Routes
app.use('/admin', adminRoutes); // Prefix your admin routes
app.use('/courses', courseRoutes);

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('App connected to database');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
