import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from '../../adapters/outbound/repositories/payment.repository';
import { PaymentEntity } from '../../domain/entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async getPayment(): Promise<PaymentEntity[]> {
    console.log('Llamado a getPayment en PaymentService');
    return await this.paymentRepository.findAll();
  }

  async getPaymentById(id: string): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new NotFoundException(`payment with ID ${id} not found`);
    }
    return payment;
  }

  async createPayment(
    paymentData: Partial<PaymentEntity>,
  ): Promise<PaymentEntity> {
    return await this.paymentRepository.create(paymentData);
  }
}
