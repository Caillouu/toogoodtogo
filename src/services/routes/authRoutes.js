import express from 'express'
import cors from 'cors';
import { test, registerUser, loginUser, getProfile } from "../controllers/authController.js"

export const authRoutes = express.Router();

// middleware
authRoutes.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

authRoutes.get('/', test)
authRoutes.post('/register', registerUser)
authRoutes.post('/login', loginUser)
authRoutes.get('/profile', getProfile)

