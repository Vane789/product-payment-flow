import { User } from './userdto';
import { Payment } from './paymentdto';
import { Product } from './productdto';

export class Order {
  constructor(
    public readonly user: string,
    public readonly payment: string,
    public readonly product: string,
  ) {}
}
