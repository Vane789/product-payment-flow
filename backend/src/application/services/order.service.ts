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

  async createOrder(createOrderDto: any): Promise<any> {
    const { user, payment, product } = createOrderDto;
    const productIds = product.map((prod) => prod.id);

    const userEntity = await this.userRepository.findOne({
      where: { id: user },
    });
    const paymentEntity = await this.paymentRepository.findOne({
      where: { id: payment },
    });

    const productEntities = await this.productRepository.findBy({
      id: In(productIds),
    });

    if (!userEntity) {
      throw new Error('User not found');
    }

    if (!paymentEntity) {
      throw new Error('Payment not found');
    }

    if (productEntities.length === 0) {
      throw new Error('Products not found');
    }

    const productIdsString = JSON.stringify(productEntities);
    const test = {
      user: userEntity.id,
      payment: paymentEntity.id,
      product: productIdsString,
    };

    const order = this.orderRepository.create(test);

    return this.orderRepository.save(order);
  }
}
