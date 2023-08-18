import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEvents {
  @PrimaryGeneratedColumn('uuid')
  EventId: string;

  @Column()
  EventType: string;

  @Column()
  UserId: string;

  @Column()
  Payload: string;

  @Column()
  Synchronized: boolean;

  @Column()
  Timestamp: Date;
}
