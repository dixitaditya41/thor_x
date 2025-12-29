import express from 'express';
import { body } from 'express-validator';
import { signup, login, getCurrentUser, logout } from '../controllers/authController.js';
import { getAllUsers, activateUser, deactivateUser, getProfile, updateProfile, changePassword } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { adminOnly } from '../middleware/rbac.js';

const router = express.Router();

// Validation rules
const signupValidation = [
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number'),
];

// Auth routes
router.post('/api/auth/signup', signupValidation, signup);
router.post('/api/auth/login', login);
router.get('/api/auth/me', protect, getCurrentUser);
router.post('/api/auth/logout', protect, logout);

// Admin routes
router.get('/api/users', protect, adminOnly, getAllUsers);
router.put('/api/users/:id/activate', protect, adminOnly, activateUser);
router.put('/api/users/:id/deactivate', protect, adminOnly, deactivateUser);

// User profile routes
router.get('/api/users/profile', protect, getProfile);
router.put('/api/users/profile', protect, updateProfile);
router.put('/api/users/password', protect, changePassword);

export default router;
