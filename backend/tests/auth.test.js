import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken.js';

describe('Authentication Tests', () => {
    const testPassword = 'Test123';

    test('should hash password correctly', async () => {
        const hashed = await bcrypt.hash(testPassword, 10);
        expect(hashed).toBeTruthy();
        expect(hashed).not.toBe(testPassword);
    });

    test('should compare password correctly', async () => {
        const hashed = await bcrypt.hash(testPassword, 10);
        const isMatch = await bcrypt.compare(testPassword, hashed);
        expect(isMatch).toBe(true);
    });

    test('should reject wrong password', async () => {
        const hashed = await bcrypt.hash(testPassword, 10);
        const isMatch = await bcrypt.compare('WrongPass', hashed);
        expect(isMatch).toBe(false);
    });

    test('should generate valid JWT token', () => {
        process.env.JWT_SECRET = 'test_secret';
        const userId = '123456';
        const token = generateToken(userId);
        expect(token).toBeTruthy();

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        expect(decoded.id).toBe(userId);
    });

    test('should validate email format', () => {
        const validEmail = 'test@example.com';
        const invalidEmail = 'invalid-email';
        const emailRegex = /^\S+@\S+\.\S+$/;

        expect(emailRegex.test(validEmail)).toBe(true);
        expect(emailRegex.test(invalidEmail)).toBe(false);
    });

    test('should validate password strength (minimum 6 chars with number)', () => {
        const weakPassword = 'short';
        const noNumberPassword = 'longpassword';
        const strongPassword = 'Test123';

        const isValid = (pwd) => pwd.length >= 6 && /\d/.test(pwd);

        expect(isValid(weakPassword)).toBe(false);
        expect(isValid(noNumberPassword)).toBe(false);
        expect(isValid(strongPassword)).toBe(true);
    });
});
