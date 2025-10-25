import { Router } from 'express';
import passport from 'passport';
import { authorize } from '../middlewares/role.middleware.js';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

const router = Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);


router.post('/', passport.authenticate('jwt', { session: false }), authorize('admin'), createProduct);
router.put('/:pid', passport.authenticate('jwt', { session: false }), authorize('admin'), updateProduct);
router.delete('/:pid', passport.authenticate('jwt', { session: false }), authorize('admin'), deleteProduct);

export default router;
