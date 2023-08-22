import { Router } from 'express';
import { orderRouter } from './orderRoutes';

export const Routes = Router();

Routes.use('/', orderRouter);
