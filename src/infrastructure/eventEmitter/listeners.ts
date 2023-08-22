import { sendOrderWelcomeEmail } from '@/domain/events/handleEventsListener';
import eventEmitter from '@/infrastructure/eventEmitter/emitter';
import { Logger } from '@/shared/logging/Logger';

eventEmitter.on('OrderCreated', (order) => {
  Logger.info(`starting event after create order ${order.email}`);
  sendOrderWelcomeEmail(order);
});
