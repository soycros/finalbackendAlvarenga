import { Router } from 'express';
import passport from 'passport';
import { loginUser, currentUser } from '../controllers/session.controller.js';

const router = Router();

router.post('/login', loginUser);

router.get('/current', passport.authenticate('jwt', { session: false }), currentUser);

export default router;
