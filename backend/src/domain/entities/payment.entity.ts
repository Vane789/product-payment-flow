import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cardNumber: string;

  @Column()
  expirationMonth: string;

  @Column()
  expirationYear: number;

  @Column()
  cvv: string;

  @Column()
  cardholderName: string;

  @Column()
  documentType: string;

  @Column()
  documentNumber: string;

  @Column()
  installments: string;

  @Column()
  acceptTerms: boolean;

  @OneToMany(() => OrderEntity, (order) => order.payment)
  order: OrderEntity[];
}
