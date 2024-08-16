import { AppDataSource } from '../../data-source';
import { ProductEntity } from '../../domain/entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

export async function seedDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized.');

    const productRepository = AppDataSource.getRepository(ProductEntity);
    const products: Partial<ProductEntity>[] = [
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770674/payment/a3kswzo1hswgspv35ixo.png',
        price: 100,
        stock: 50,
        description: 'Product 1 Description',
        quantity: 10,
      },
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770673/payment/rb66xbtvhkjopzwwezrt.png',
        price: 150,
        stock: 30,
        description: 'Product 2 Description',
        quantity: 5,
      },
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770673/payment/huli27xpbjrow48ie7mq.png',
        price: 150,
        stock: 30,
        description: 'Product 3 Description',
        quantity: 5,
      },
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770671/payment/gse410qdvfv9kqcuahau.png',
        price: 150,
        stock: 30,
        description: 'Product 4 Description',
        quantity: 5,
      },
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770671/payment/rbu4akxhkwaug4fpilyx.png',
        price: 150,
        stock: 30,
        description: 'Product 5 Description',
        quantity: 5,
      },
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770670/payment/fc3nmrqz69c4cfvsfi7h.png',
        price: 150,
        stock: 30,
        description: 'Product 6 Description',
        quantity: 5,
      },
    ];

    for (const product of products) {
      const productEntity = productRepository.create(product);
      await productRepository.save(productEntity);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await AppDataSource.destroy();
  }
}
