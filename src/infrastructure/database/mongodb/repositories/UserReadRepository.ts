import { IUserListModel } from '@/domain/user/userList';
import { UserReadModel } from '../schemas/UserSchema';

export class UserReadRepository {
  static async create(user: IUserListModel): Promise<IUserListModel> {
    const newUser = new UserReadModel(user);
    await newUser.save();
    return newUser;
  }

  static async findAll(): Promise<IUserListModel[]> {
    return UserReadModel.find();
  }
}
