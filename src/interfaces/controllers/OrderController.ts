import { Request, Response } from 'express';
import { EmailAlreadyExists } from '@/domain/errors/EmailAlreadyExistsError';
import { Logger } from '@/shared/logging/Logger';
import { OrderEventRepository } from '@/infrastructure/database/postgres/repositories/OrderEventRepository';
import { HttpCode } from '../../config/constants/httpCode';
import { OrderService } from '../../application/services/OrderService';

const orderService = new OrderService(new OrderEventRepository());

export const createOrderController = async (req: Request, res: Response) => {
  const order = req.body;

  try {
    await orderService.createOrder(order);
    res.status(HttpCode.CREATED).send('Order created');
  } catch (error) {
    if (error instanceof EmailAlreadyExists) {
      res.status(HttpCode.CONFLICT).send({
        error: 'Conflict',
        message: 'The email address is already registered.',
      });
      return;
    }
    Logger.info(error);
    res.status(HttpCode.INTERNAL_ERROR).send('Failed to create order');
  }
};
