import { Request, Response, Router } from 'express';
import { createOrderController } from '../controllers/OrderController';
import { orderSchema } from '../validation/OrderSchema';
import { validateSchema } from '../middlewares/validateSchema';
import { getOrdersQuery } from '../../application/queries/getOrderQuery';
import { HttpCode } from '../../config/constants/httpCode';

export const orderRouter: Router = Router();

orderRouter.post('/order', validateSchema(orderSchema), createOrderController);

orderRouter.get('/orders', async (req: Request, res: Response) => {
  const orders = await getOrdersQuery();

  res.status(HttpCode.SUCCESS).json(orders);
});
