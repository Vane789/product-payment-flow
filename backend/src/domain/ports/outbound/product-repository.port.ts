import { ProductEntity } from '../../entities/product.entity';

export interface ProductRepositoryPort {
  findAll(): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | null>;
}
