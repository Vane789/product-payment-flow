import { Module } from '@nestjs/common';
import { ProductModule } from './entrypoints/api/product.module';
import { DatabaseModule } from './infraestructure/database/database.module';
import { OrderModule } from './entrypoints/api/order.module';
import { PaymentModule } from './entrypoints/api/payment.module';
import { UserModule } from './entrypoints/api/user.module';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    OrderModule,
    PaymentModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
