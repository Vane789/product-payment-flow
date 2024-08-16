import { Module } from '@nestjs/common';
import { ProductModule } from './entrypoints/api/product.module';
import { DatabaseModule } from './infraestructure/database/database.module';
import { OrderModule } from './entrypoints/api/order.module';
import { PaymentModule } from './entrypoints/api/payment.module';

@Module({
  imports: [DatabaseModule, ProductModule, OrderModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
