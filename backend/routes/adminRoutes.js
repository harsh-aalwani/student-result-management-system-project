import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Registration route
router.post('/register', registerAdmin); // Register endpoint

// Login route
router.post('/login', loginAdmin); // Login endpoint

export default router;
