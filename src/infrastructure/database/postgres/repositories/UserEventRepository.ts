import { UserEvents } from '@/domain/entity/userEvents';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import dataSource from '../../../../datasource';

export class UserEventRepository implements IUserRepository {
  private userEventsRepository;

  constructor() {
    this.userEventsRepository = dataSource.getRepository(UserEvents);
  }

  async saveUserEvent(eventData: Omit<UserEvents, 'eventId'>): Promise<void> {
    await this.userEventsRepository.save(eventData);
  }

  async findUnsynchronized(): Promise<UserEvents[]> {
    return this.userEventsRepository.find({ where: { synchronized: false } });
  }

  async markAsSynchronized(eventId: string): Promise<void> {
    await this.userEventsRepository.update(eventId, { synchronized: true });
  }
}
