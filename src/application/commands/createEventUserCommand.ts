import { UserService } from '@/application/services/UserService';
import { IUserListModel } from '@/domain/user/userList';
import { UserEventRepository } from '@/infrastructure/database/postgres/repositories/UserEventRepository';

const userService = new UserService(new UserEventRepository());

export const createEventUserCommand = async (user: IUserListModel): Promise<boolean> => userService.createUser(user);
