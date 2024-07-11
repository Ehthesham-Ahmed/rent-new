import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { bookCar } from '../controllers/book.controller.js';

const router = express.Router();

router.post('/create', verifyToken, bookCar);

export default router;