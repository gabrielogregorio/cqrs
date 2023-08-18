import { UserListModel, IUserListModel } from './userListModel';

export class UserListService {
  static async Create({ name, email, id }: IUserListModel): Promise<IUserListModel> {
    const newPost = new UserListModel({ name, email, id });
    await newPost.save();
    return newPost;
  }

  static async FindAll(): Promise<IUserListModel[]> {
    const posts = await UserListModel.find({}, null, {
      sort: {
        updatedAt: -1,
      },
    }).populate('user');

    return posts;
  }
}
