import { OrderService } from '@/application/services/OrderService';
import { OrderEventRepository } from '@/infrastructure/database/postgres/repositories/OrderEventRepository';
import { IOrderListModel } from '@/domain/order/orderList';

const orderService = new OrderService(new OrderEventRepository());

export const createEventOrderCommand = async (user: IOrderListModel): Promise<boolean> =>
  orderService.createOrder(user);
