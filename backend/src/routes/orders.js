import express from 'express';
import orderController from '../controllers/orderController';
import authMiddleware from '../middleware/authMiddleware';
const router = express.Router();

router.post('/', authMiddleware.authenticate, orderController.createOrder);
router.get('/:id', authMiddleware.authenticate, orderController.getOrder);
router.post('/:id/pay', authMiddleware.authenticate, orderController.processBitcoinPayment);
router.get('/user/:userId', authMiddleware.authenticate, orderController.getUserOrders);

export default router;