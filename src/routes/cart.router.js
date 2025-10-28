import { Router } from 'express';
import {
  createCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  updateCartProducts,
  updateProductQuantity,
  clearCart,
  purchaseCart
} from '../controllers/cart.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router(); // 

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/product/:pid', removeProductFromCart);
router.put('/:cid', updateCartProducts);
router.put('/:cid/product/:pid', updateProductQuantity);
router.delete('/:cid', clearCart);
router.post('/:cid/purchase', authenticateJWT, purchaseCart); // ✅ corregido

export default router;
