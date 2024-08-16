import { OrderEntity } from '../../entities/order.entity';

export interface OrderRepositoryPort {
  findAll(): Promise<OrderEntity[]>;
  findById(id: string): Promise<OrderEntity | null>;
}
