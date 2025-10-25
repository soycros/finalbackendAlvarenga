import { Router } from 'express';
import { requestReset, resetPassword } from '../controllers/password.controller.js';

export const passwordRouter = Router();

passwordRouter.post('/request-reset', requestReset);
passwordRouter.post('/reset-password', resetPassword);
