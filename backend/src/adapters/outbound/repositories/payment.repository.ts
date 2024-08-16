import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from '../../../domain/entities/payment.entity';
import { PaymentRepositoryPort } from '../../../domain/ports/outbound/payment-repository.ports';

@Injectable()
export class PaymentRepository implements PaymentRepositoryPort {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async findAll(): Promise<PaymentEntity[]> {
    return this.paymentRepository.find();
  }

  async findById(id: string): Promise<PaymentEntity | null> {
    return this.paymentRepository.findOneBy({ id });
  }

  async save(payment: PaymentEntity): Promise<PaymentEntity> {
    return this.paymentRepository.save(payment);
  }

  async create(paymentData: Partial<PaymentEntity>): Promise<PaymentEntity> {
    const payment = this.paymentRepository.create(paymentData);
    return this.paymentRepository.save(payment);
  }
}
