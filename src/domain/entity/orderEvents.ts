import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrderEvents {
  @PrimaryGeneratedColumn('uuid')
  eventId: string;

  @Column()
  eventType: string;

  @Column()
  orderId: string;

  @Column()
  payload: string;

  @Column()
  synchronized: boolean;

  @Column()
  timestamp: Date;
}
