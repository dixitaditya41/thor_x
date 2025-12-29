import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';
import router from './routes/index.js';

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

// Health check
app.get('/', (req, res) => {
    res.json({ message: '⚽ User Management System API' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Connect DB and start server
const PORT = process.env.PORT || 5000;

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚽ Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to start server:', error);
        process.exit(1);
    });
