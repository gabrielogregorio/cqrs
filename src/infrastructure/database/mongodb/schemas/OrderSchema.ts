import mongoose from 'mongoose';
import { IOrderListModel } from '@/domain/order/orderList';

const orderSchema = new mongoose.Schema<IOrderListModel>(
  {
    name: String,
    email: String,
    id: String,
  },
  {
    timestamps: true,
  },
);

export const OrderReadModel = mongoose.model<IOrderListModel>('Order', orderSchema);
