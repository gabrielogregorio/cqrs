import { OrderEventRepository } from '@/infrastructure/database/postgres/repositories/OrderEventRepository';
import eventEmitter from '@/infrastructure/eventEmitter/emitter';
import { OrderListService } from '@/application/services/orderListService';
import { Logger } from '@/shared/logging/Logger';
import { IOrderListModel } from '@/domain/order/orderList';

const eventsRepository = new OrderEventRepository();

Logger.info('process events started');

export const processEvents = async () => {
  const eventsItems = await eventsRepository.findUnsynchronized();

  if (eventsItems.length === 0) {
    return;
  }

  Logger.info('starting process events');

  await eventsItems.forEach(async (item) => {
    Logger.info(`starting process event ${item.eventType} as id ${item.eventId} as orderId ${item.orderId}`);

    const { name, email } = JSON.parse(item.payload) as IOrderListModel;

    await OrderListService.create({ name, email, id: item.orderId });
    eventEmitter.emit('OrderCreated', { email, name });
    await eventsRepository.markAsSynchronized(item.eventId);
  });
};
