import dataSource from '../datasource';
import { UserEvents } from '../entity/userEvents.entity';

export const createUserCommand = async (user: { name: string; email: string }): Promise<boolean> => {
  const userEventsRepository = dataSource.getRepository(UserEvents);

  const userEvent = {
    eventType: 'CreateUser',
    userId: new Date().getTime().toString(),
    payload: JSON.stringify(user),
    timestamp: new Date(),
    synchronized: false,
  };

  try {
    await userEventsRepository.save(userEvent);
    console.log(`event '${userEvent.eventType}' create as userId ${userEvent.userId}.`);
    return true;
  } catch (error) {
    console.error(`failed to save event ${userEvent.eventType}`, error);
    throw new Error('Failed to create user');
  }
};
