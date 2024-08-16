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
        price: 80.0,
        stock: 50,
        description: 'Vaca lola Amigurumi',
        quantity: 10,
      },
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770673/payment/rb66xbtvhkjopzwwezrt.png',
        price: 133.0,
        stock: 30,
        description: 'Pollito pio pio Amigurumi',
        quantity: 25,
      },
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770673/payment/huli27xpbjrow48ie7mq.png',
        price: 123.0,
        stock: 30,
        description: 'Lucas pug Amigurumi',
        quantity: 1,
      },
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770671/payment/gse410qdvfv9kqcuahau.png',
        price: 155.0,
        stock: 10,
        description: 'Blanca Amigurumi',
        quantity: 2,
      },
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770671/payment/rbu4akxhkwaug4fpilyx.png',
        price: 110.0,
        stock: 6,
        description: 'Unicornio Amigurumi',
        quantity: 4,
      },
      {
        id: uuidv4(),
        img: 'https://res.cloudinary.com/dlsflz6zz/image/upload/v1723770670/payment/fc3nmrqz69c4cfvsfi7h.png',
        price: 158.0,
        stock: 30,
        description: 'Tortuga feliz',
        quantity: 1,
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

seedDatabase();
