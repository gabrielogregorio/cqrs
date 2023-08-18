import dataSource from '../datasource';
import { UserEvents } from '../entity/userEvents.entity';

export const createUserCommand = async (user: { name: string; email: string }) => {
  const userEventsRepository = dataSource.getRepository(UserEvents);

  await userEventsRepository.save({
    EventType: 'CreateUser',
    UserId: new Date().getTime().toString(),
    Payload: JSON.stringify(user),
    timestamp: new Date(),
    Synchronized: false,
  });
  return true;
};
