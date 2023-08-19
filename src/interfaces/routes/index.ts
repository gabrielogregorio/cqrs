import { Router } from 'express';
import { userRouter } from './userRoutes';

export const Routes = Router();

Routes.use('/', userRouter);
