import express from 'express';
import { Order } from '../models/index.js';

const router = express.Router();

// BitPay webhook handler
router.post('/bitpay', async (req, res) => {
  const { event, data } = req.body;
  
  if (event.code === 'invoice_completed') {
    const order = await Order.findByPk(data.orderId);
    if (order) {
      await order.update({ 
        status: 'paid',
        paymentMethod: 'BTC',
        transactionHash: data.transactionHash
      });
      
      // Initiate USD settlement (BitPay handles this automatically)
      console.log(`Payment settled for order ${order.id}`);
    }
  }

  res.status(200).send('OK');
});

export default router;