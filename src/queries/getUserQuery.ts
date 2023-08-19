import { IUserListModel } from '../query/userListModel';
import { UserListService } from '../query/usersList';

export const getUserQuery = async (): Promise<IUserListModel[]> => UserListService.FindAll();
