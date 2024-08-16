import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../adapters/outbound/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(): Promise<UserEntity[]> {
    console.log('Llamado a getUser en UserService');
    return await this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`user with ID ${id} not found`);
    }
    return user;
  }

  async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.create(userData);
  }
}
