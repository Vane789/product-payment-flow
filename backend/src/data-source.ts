import { DataSource } from 'typeorm';
import { ProductEntity } from './domain/entities/product.entity';
import { UserEntity } from './domain/entities/user.entity';
import { OrderEntity } from './domain/entities/order.entity';
import { PaymentEntity } from './domain/entities/payment.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'postgres',
  entities: [UserEntity, ProductEntity, OrderEntity, PaymentEntity],
  synchronize: true,
});
