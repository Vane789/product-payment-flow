import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from '../../application/services/order.service';
import { OrderController } from './order.controller';
import { OrderEntity } from '../../domain/entities/order.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { ProductEntity } from '../../domain/entities/product.entity';
import { PaymentModule } from './payment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      UserEntity,
      PaymentEntity,
      ProductEntity,
    ]),
    PaymentModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
