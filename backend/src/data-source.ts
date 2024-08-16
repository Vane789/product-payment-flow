import { DataSource } from 'typeorm';
import { ProductEntity } from './domain/entities/product.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'postgres',
  entities: [ProductEntity],
  synchronize: true,
});
