import { IOrderListModel } from '@/domain/order/orderList';
import { OrderListService } from '@/application/services/orderListService';

export const getOrdersQuery = async (): Promise<IOrderListModel[]> => OrderListService.findAll();
