import { Module } from '@nestjs/common';
import { ProductController } from '../api/product.controller';
import { ProductService } from '../../application/services/product.service';
import { ProductRepository } from '../../adapters/outbound/repositories/product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../domain/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
