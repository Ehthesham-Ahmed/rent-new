import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { bookCar, getCarBookings, getbookings } from '../controllers/book.controller.js';

const router = express.Router();

router.post('/create', verifyToken, bookCar);
router.get('/getCarBookings/:postId', getCarBookings);
router.get('/getbookings', verifyToken, getbookings);

export default router;