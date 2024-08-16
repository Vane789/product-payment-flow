import { UserEntity } from '../../entities/user.entity';

export interface UserRepositoryPort {
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
}
