import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column()
  user: string;

  @Column()
  payment: string;

  @Column()
  product: string;
}
