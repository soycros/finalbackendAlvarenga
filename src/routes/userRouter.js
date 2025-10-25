import { Router } from 'express';
import passport from 'passport';
import { registerUser, getUsers, deleteUser } from '../controllers/user.controller.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

router.post('/', registerUser); // Registro público

router.get('/', passport.authenticate('jwt', { session: false }), authorize('admin'), getUsers);

router.delete('/:id', passport.authenticate('jwt', { session: false }), authorize('admin'), deleteUser);

export default router;
