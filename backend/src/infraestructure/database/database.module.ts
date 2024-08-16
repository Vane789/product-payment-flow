import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { ProductEntity } from '../../domain/entities/product.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { ProductService } from '../../application/services/product.service';
import { ProductController } from '../../entrypoints/api/product.controller';
import { ProductRepository } from '../../adapters/outbound/repositories/product.repository';
import { OrderEntity } from 'src/domain/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      entities: [PaymentEntity, ProductEntity, UserEntity, OrderEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      PaymentEntity,
      ProductEntity,
      UserEntity,
      OrderEntity,
    ]),
  ],
  // controllers: [ProductController],
  // providers: [ProductService, ProductRepository],
})
export class DatabaseModule {}
