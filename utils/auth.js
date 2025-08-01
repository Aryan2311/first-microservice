import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Customer from '../database/models/Customer_Model.js';
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = await verifyToken(token);
        req.user = decoded;
        const user = await Customer.findById(decoded.id); 

        if (!user) {
        return res.status(401).json({ message: 'User no longer exists' });
        }
        console.log("Authenticated user:", req.user);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
    }
}
