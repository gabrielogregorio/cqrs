import { OrderEvents } from '../entity/orderEvents';

export interface IOrderRepository {
  saveOrderEvent(order: Omit<OrderEvents, 'eventId'>): Promise<void>;
  findUnsynchronized(): Promise<OrderEvents[]>;
  markAsSynchronized(eventId: string): Promise<void>;
}
