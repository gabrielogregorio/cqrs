import { IOrderListModel } from '@/domain/order/orderList';
import { OrderReadModel } from '../schemas/OrderSchema';

export class OrderReadRepository {
  static async create(order: IOrderListModel): Promise<IOrderListModel> {
    const newOrder = new OrderReadModel(order);
    await newOrder.save();
    return newOrder;
  }

  static async findAll(): Promise<IOrderListModel[]> {
    return OrderReadModel.find();
  }
}
