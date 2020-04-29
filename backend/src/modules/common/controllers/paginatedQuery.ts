import { Query } from './query';

export interface PaginatedQuery extends Query {
  page: number;
  perPage: number;
}
