import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure unique usernames
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique emails
    },
    password: {
        type: String,
        required: true,
    },
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
