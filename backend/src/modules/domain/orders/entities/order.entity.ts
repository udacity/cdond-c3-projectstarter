import { Product } from './product.entity';
import {
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AggregateRoot } from '../../../common/entities';
import { ProductAddedToOrder } from '../events/ProductAddedToOrder';

@Entity()
export class Order extends AggregateRoot<string> {
  constructor(params: { id: string; products?: Product[] } = {} as Order) {
    super();

    const { id, products } = params;

    this.id = id;
    this.products = products;
  }

  @PrimaryColumn('uuid')
  id: string;

  @ManyToMany(type => Product)
  @JoinTable()
  products: Product[];

  addProduct(product: Product) {
    if (!this.products) this.products = [];
    this.products.push(product);

    this.apply(new ProductAddedToOrder(this.id, product.id));
  }

  getProducts(): Product[] {
    return this.products;
  }
}
