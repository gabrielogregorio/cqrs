import mongoose from 'mongoose';
import { IUserListModel } from '@/domain/user/userList';

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

export const UserReadModel = mongoose.model<IUserListModel>('User', userSchema);
