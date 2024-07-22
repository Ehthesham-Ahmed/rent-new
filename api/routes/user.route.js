import express from 'express';
import { getUser, signout, test } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.post('/signout', signout);
router.get('/:userId', getUser);


export default router;