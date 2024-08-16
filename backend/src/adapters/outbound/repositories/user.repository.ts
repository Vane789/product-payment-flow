import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRepositoryPort } from '../../../domain/ports/outbound/user-repository.ports';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  async save(payment: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(payment);
  }

  async create(paymentData: Partial<UserEntity>): Promise<UserEntity> {
    const payment = this.userRepository.create(paymentData);
    return this.userRepository.save(payment);
  }
}
