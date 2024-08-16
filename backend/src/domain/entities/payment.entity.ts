import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
  expirationYear: string;

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

  @ManyToOne(() => OrderEntity, (order) => order.payment)
  order: OrderEntity;
}
