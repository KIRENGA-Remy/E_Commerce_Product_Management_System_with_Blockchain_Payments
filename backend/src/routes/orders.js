import express from 'express';
import {
    createOrder, 
    getOrder, 
    processBitcoinPayment, 
    getUserOrders
} from '../controllers/orderController.js';
import {authenticate} from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/:id', authenticate, getOrder);
router.post('/:id/pay', authenticate, processBitcoinPayment);
router.get('/user/:userId', authenticate, getUserOrders);

export default router;