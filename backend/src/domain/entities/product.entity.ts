import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  img: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column('int')
  stock: number;

  @Column('int')
  quantity: number;

  @ManyToMany(() => OrderEntity, (order) => order.product)
  orders: OrderEntity[];
}
