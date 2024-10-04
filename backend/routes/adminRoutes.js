import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/adminController.js';

const router = express.Router();

// Existing routes for login and register
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

export default router;
