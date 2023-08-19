import { UserEventRepository } from '@/infrastructure/database/postgres/repositories/UserEventRepository';
import eventEmitter from '@/infrastructure/eventEmitter/emitter';
import { UserListService } from '@/application/services/userListService';
import { Logger } from '@/shared/logging/Logger';
import { IUserListModel } from '@/domain/user/userList';

const eventsRepository = new UserEventRepository();

Logger.info('process events started');

export const processEvents = async () => {
  const eventsItems = await eventsRepository.findUnsynchronized();

  if (eventsItems.length === 0) {
    return;
  }

  Logger.info('starting process events');

  await eventsItems.forEach(async (item) => {
    Logger.info(`starting process event ${item.eventType} as id ${item.eventId} as userId ${item.userId}`);

    const { name, email } = JSON.parse(item.payload) as IUserListModel;

    await UserListService.create({ name, email, id: item.userId });
    eventEmitter.emit('UserCreated', { email, name });
    await eventsRepository.markAsSynchronized(item.eventId);
  });
};
