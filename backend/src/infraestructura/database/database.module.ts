import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Product } from '../../domain/model/productDTO';
import { User } from '../../domain/model/userDTO';
import { Payment } from '../../domain/model/paymentDTO';

export const DbConnection = [
  {
    provide: 'DataSource',
    useFactory: async (ConfigService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'admin',
        database: 'crocheandodb',
        entities: [User, Product, Payment],
        synchronize: true,
        logging: false,
      });
      return await dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
