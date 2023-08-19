import { IUserListModel } from '@/domain/user/userList';
import { UserReadRepository } from '@/infrastructure/database/mongodb/repositories/UserReadRepository';

export class UserListService {
  static async create(user: IUserListModel): Promise<IUserListModel> {
    return UserReadRepository.create(user);
  }

  static async findAll(): Promise<IUserListModel[]> {
    return UserReadRepository.findAll();
  }
}
