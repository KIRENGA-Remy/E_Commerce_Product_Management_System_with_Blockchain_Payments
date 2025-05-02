import express from 'express'
import productController from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';
const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', authMiddleware.isAdmin, productController.createProduct);
router.put('/:id', authMiddleware.isAdmin, productController.updateProduct);
router.delete('/:id', authMiddleware.isAdmin, productController.deleteProduct);

export default router;