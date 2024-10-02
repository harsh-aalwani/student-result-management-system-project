import Admin from '../models/Admin.js';


// Login Admin
export const loginAdmin = async (req, res) => {
    console.log("Login request received:", req.body); // Log the incoming request
    const { username, password } = req.body;

    try {
        console.log("Searching for admin with username:", username); // Log the username being searched
        const admin = await Admin.findOne({ username });

        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        // Directly compare the plain text password
        if (admin.password !== password) return res.status(400).json({ message: 'Invalid credentials' });

        res.json({ message: 'Login successful', admin });
    } catch (error) {
        console.error('Database query error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//Register
export const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Create new admin
        const newAdmin = new Admin({
            username,
            email,
            password // For simplicity, we'll keep it un-hashed for now
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};