import { UserEvents } from '../entity/userEvents';

export interface IUserRepository {
  saveUserEvent(user: Omit<UserEvents, 'eventId'>): Promise<void>;
  findUnsynchronized(): Promise<UserEvents[]>;
  markAsSynchronized(eventId: string): Promise<void>;
}
