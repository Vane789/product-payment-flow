import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PaymentEntity } from './payment.entity';
import { ProductEntity } from './product.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'PENDING' })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.order)
  payment: PaymentEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orders)
  products: ProductEntity[];
}
