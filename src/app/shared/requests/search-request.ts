export class ValueCompare {
  value: string;
  compare: string;
}
export interface SearchRequest {
  limit: number;
  page: number;
  sortField: string;
  sortOrder: number;
  searchValue: Record<string, ValueCompare>,
  selectFields: string
  //1: descending
  //0: ascending
}

