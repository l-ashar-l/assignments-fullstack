import { Router } from 'express';
import resumeRouter from './controllers/routes';

export const router = Router();

router.use('/resume', resumeRouter);
