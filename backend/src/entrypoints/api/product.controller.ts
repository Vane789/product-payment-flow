import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from '../../application/services/product.service';
import { Product } from '../../application/model/productDTO';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<Product[]> {
    console.log('entro por aca en metodo GET');
    const products = await this.productService.getProducts();
    console.log('products :: ', products);
    return products.map(
      (product) =>
        new Product(
          product.id,
          product.img,
          product.description,
          product.price,
          product.stock,
          product.quantity,
        ),
    );
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.getProductById(id);
    return new Product(
      product.id,
      product.img,
      product.description,
      product.price,
      product.stock,
      product.quantity,
    );
  }
}
