import { Router } from 'express';
import passport from 'passport';
import { purchaseCart } from '../controllers/purchase.controller.js';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), purchaseCart);

export default router;
