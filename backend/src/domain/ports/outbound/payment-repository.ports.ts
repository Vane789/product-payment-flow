import { PaymentEntity } from '../../entities/payment.entity';

export interface PaymentRepositoryPort {
  findAll(): Promise<PaymentEntity[]>;
  findById(id: string): Promise<PaymentEntity | null>;
}
