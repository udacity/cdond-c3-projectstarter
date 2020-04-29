import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { AggregateRoot } from '../../../common/entities';

@Entity()
export class Product extends AggregateRoot<string> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToMany(type => Order)
  order: Order[];
}
