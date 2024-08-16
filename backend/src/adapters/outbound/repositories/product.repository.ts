import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductRepositoryPort } from '../../../domain/ports/outbound/product-repository.port';

@Injectable()
export class ProductRepository implements ProductRepositoryPort {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findById(id: string): Promise<ProductEntity | null> {
    return this.productRepository.findOneBy({ id });
  }

  async save(product: ProductEntity): Promise<ProductEntity> {
    return this.productRepository.save(product);
  }

  async create(product: Partial<ProductEntity>): Promise<ProductEntity> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }
}
