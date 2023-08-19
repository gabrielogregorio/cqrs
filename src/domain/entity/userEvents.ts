import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEvents {
  @PrimaryGeneratedColumn('uuid')
  eventId: string;

  @Column()
  eventType: string;

  @Column()
  userId: string;

  @Column()
  payload: string;

  @Column()
  synchronized: boolean;

  @Column()
  timestamp: Date;
}
