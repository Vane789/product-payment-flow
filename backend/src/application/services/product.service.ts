import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../adapters/outbound/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
}
