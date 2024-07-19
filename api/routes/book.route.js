import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { bookCar, getCarBookings } from '../controllers/book.controller.js';

const router = express.Router();

router.post('/create', verifyToken, bookCar);
router.get('/getCarBookings/:postId', getCarBookings);

export default router;