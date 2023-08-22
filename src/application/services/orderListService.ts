import { IOrderListModel } from '@/domain/order/orderList';
import { OrderReadRepository } from '@/infrastructure/database/mongodb/repositories/OrderReadRepository';

export class OrderListService {
  static async create(order: IOrderListModel): Promise<IOrderListModel> {
    return OrderReadRepository.create(order);
  }

  static async findAll(): Promise<IOrderListModel[]> {
    return OrderReadRepository.findAll();
  }
}
