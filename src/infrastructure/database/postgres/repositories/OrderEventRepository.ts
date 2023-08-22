import { OrderEvents } from '@/domain/entity/orderEvents';
import { IOrderRepository } from '@/domain/repositories/IOrderRepository';
import dataSource from '../../../../datasource';

export class OrderEventRepository implements IOrderRepository {
  private orderEventsRepository;

  constructor() {
    this.orderEventsRepository = dataSource.getRepository(OrderEvents);
  }

  async saveOrderEvent(eventData: Omit<OrderEvents, 'eventId'>): Promise<void> {
    await this.orderEventsRepository.save(eventData);
  }

  async findUnsynchronized(): Promise<OrderEvents[]> {
    return this.orderEventsRepository.find({ where: { synchronized: false } });
  }

  async markAsSynchronized(eventId: string): Promise<void> {
    await this.orderEventsRepository.update(eventId, { synchronized: true });
  }
}
