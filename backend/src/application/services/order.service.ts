import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../model/orderDTO';
import { OrderEntity } from '../../domain/entities/order.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { ProductEntity } from '../../domain/entities/product.entity';
import { In } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createOrder(createOrderDto: Order): Promise<OrderEntity> {
    const { user, payment, product } = createOrderDto;

    const userEntity = await this.userRepository.findOne({
      where: { id: user.id },
    });
    const paymentEntity = await this.paymentRepository.findOne({
      where: { id: payment.id },
    });
    const productEntities = await this.productRepository.findBy({
      id: In(product.map((p) => p.id)),
    });
    console.log('userEntity ', userEntity);
    console.log('paymentEntity ', paymentEntity);
    console.log('productEntities ', productEntities);

    if (!userEntity) {
      throw new Error('User not found');
    }

    if (!paymentEntity) {
      throw new Error('Payment not found');
    }

    if (productEntities.length === 0) {
      throw new Error('Products not found');
    }

    const order = this.orderRepository.create({
      user: userEntity,
      payment: paymentEntity,
      products: productEntities,
      status: 'PENDING',
    });

    console.log('order ', order);

    return this.orderRepository.save(order);
  }
}
