import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../../domain/entities/order.entity';
import { OrderRepositoryPort } from '../../../domain/ports/outbound/order-repository.port';

@Injectable()
export class OrderRepository implements OrderRepositoryPort {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return this.orderRepository.find();
  }

  async findById(id: string): Promise<OrderEntity | null> {
    return this.orderRepository.findOneBy({ id });
  }

  async save(order: OrderEntity): Promise<OrderEntity> {
    return this.orderRepository.save(order);
  }

  async create(order: Partial<OrderEntity>): Promise<OrderEntity> {
    const neworder = this.orderRepository.create(order);
    return this.orderRepository.save(neworder);
  }
}
