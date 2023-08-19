import { sendUserWelcomeEmail } from '@/domain/events/handleEventsListener';
import eventEmitter from '@/infrastructure/eventEmitter/emitter';
import { Logger } from '@/shared/logging/Logger';

eventEmitter.on('UserCreated', (user) => {
  Logger.info(`starting event after create user ${user.email}`);
  sendUserWelcomeEmail(user);
});
