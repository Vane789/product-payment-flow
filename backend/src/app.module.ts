import { Module } from '@nestjs/common';
import { ProductModule } from './entrypoints/api/product.module';
import { DatabaseModule } from './infraestructure/database/database.module';

@Module({
  imports: [DatabaseModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
