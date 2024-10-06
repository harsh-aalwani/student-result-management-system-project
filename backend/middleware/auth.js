// middleware/auth.js
export const ensureAuthenticated = (req, res, next) => {
    if (req.session.adminId) {
        return next(); // Proceed if authenticated
    }
    return res.status(401).json({ message: 'Unauthorized access' }); // Reject if not
};
