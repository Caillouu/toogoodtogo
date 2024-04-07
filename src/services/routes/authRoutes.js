import express from 'express'
import cors from 'cors';
import { test, registerUser, loginUser, getProfile, updateProfile, logout } from "../controllers/authController.js"

export const router = express.Router();

// middleware
router.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/updateProfile', updateProfile)
router.post('/logout', logout)

