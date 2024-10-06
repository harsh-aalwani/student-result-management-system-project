import express from 'express';
import { loginAdmin, registerAdmin, logoutAdmin, checkSession } from '../controllers/adminController.js';
import { ensureAuthenticated } from '../middleware/auth.js'; // Ensure the path is correct

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.post('/logout', logoutAdmin);
router.get('/session', checkSession);

// Protected routes (example)
router.get('/protected-route', ensureAuthenticated, (req, res) => {
    res.json({ message: 'This is a protected route!' });
});

export default router;
