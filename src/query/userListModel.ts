import mongoose from 'mongoose';

export interface IUserListModel {
  name: string;
  email: string;
  id: string;
}

const userSchema = new mongoose.Schema<IUserListModel>(
  {
    name: String,
    email: String,
    id: String,
  },
  {
    timestamps: true,
  },
);

export const UserListModel = mongoose.model<IUserListModel>('User', userSchema);
