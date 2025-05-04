import express from 'express'
import BitcoinService from '../services/BitcoinService.js';

const router = express.Router()
router.post('/address', (req, res) => {
  const address = BitcoinService.generateAddress();
  res.json({ address });
});

export default router;