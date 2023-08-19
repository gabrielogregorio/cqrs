import { UserEventRepository } from '@/infrastructure/database/postgres/repositories/UserEventRepository';
import { Logger } from '@/shared/logging/Logger';

export class UserService {
  private userRepository: UserEventRepository;

  constructor(userRepository: UserEventRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: { name: string; email: string }): Promise<boolean> {
    const userEvent = {
      eventType: 'CreateUser',
      userId: new Date().getTime().toString(),
      payload: JSON.stringify(user),
      timestamp: new Date(),
      synchronized: false,
    };

    try {
      await this.userRepository.saveUserEvent(userEvent);
      Logger.info(`event '${userEvent.eventType}' created as userId ${userEvent.userId}.`);
      return true;
    } catch (error) {
      Logger.error(`failed to save event ${userEvent.eventType}`, error);
      throw new Error('Failed to create user');
    }
  }
}
