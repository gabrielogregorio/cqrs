import { UserListService } from '@/application/services/userListService';
import { IUserListModel } from '@/domain/user/userList';

export const getUserQuery = async (): Promise<IUserListModel[]> => UserListService.findAll();
