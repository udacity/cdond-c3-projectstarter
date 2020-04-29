import { PaginatedQuery } from '../../../common/controllers';

export interface PaginatedEmployeeQuery extends PaginatedQuery {
  id: number;
  pageSize: number;
  pageNumber: number;
}
