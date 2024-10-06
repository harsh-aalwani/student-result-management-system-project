import Admin from '../models/Admin.js';

export const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        if (admin.password !== password) return res.status(400).json({ message: 'Invalid credentials' });

        // Store admin information in session
        req.session.adminId = admin._id;
        res.json({ message: 'Login successful', admin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Register Admin
export const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const newAdmin = new Admin({
            username,
            email,
            password
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Logout
export const logoutAdmin = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.json({ message: 'Logout successful' });
    });
};

// Check session
export const checkSession = (req, res) => {
    if (req.session.adminId) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
};

