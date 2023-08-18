import { UserEvents } from '../entity/userEvents.entity';

export const userCreatedEvent = (user: UserEvents): void => {
  console.log(`User ${user.EventId} was created!`);
  console.log('send e-mail');
  console.log('send to queue');
};
