import { User } from './userdto';
import { Payment } from './paymentdto';
import { Product } from './productdto';

export class Order {
  constructor(
    public readonly user: User,
    public readonly creditCard: Payment,
    public readonly product: Product[],
  ) {}
}
