import { PaginatedQuery } from '../../../common/controllers';

export interface PaginatedProductQuery extends PaginatedQuery {
  id: number;
  description: string;
}
