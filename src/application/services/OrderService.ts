import { Logger } from '@/shared/logging/Logger';
import { OrderEventRepository } from '@/infrastructure/database/postgres/repositories/OrderEventRepository';

export class OrderService {
  private orderRepository: OrderEventRepository;

  constructor(orderRepository: OrderEventRepository) {
    this.orderRepository = orderRepository;
  }

  async createOrder(order: { name: string; email: string }): Promise<boolean> {
    const orderEvent = {
      eventType: 'CreateOrder',
      orderId: new Date().getTime().toString(),
      payload: JSON.stringify(order),
      timestamp: new Date(),
      synchronized: false,
    };

    try {
      await this.orderRepository.saveOrderEvent(orderEvent);
      Logger.info(`event '${orderEvent.eventType}' created as orderId ${orderEvent.orderId}.`);
      return true;
    } catch (error) {
      Logger.error(`failed to save event ${orderEvent.eventType}`, error);
      throw new Error('Failed to create order');
    }
  }
}
