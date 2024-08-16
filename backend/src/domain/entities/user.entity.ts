import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  department: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  shippingAddress: string;

  @Column()
  details: string;
}
