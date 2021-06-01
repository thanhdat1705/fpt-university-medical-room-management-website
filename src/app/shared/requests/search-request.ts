export interface SearchRequest {
  limit: number;
  page: number;
  search: string;
  sortField: string;
  sortOrder: number;
  //1: descending
  //0: ascending
}
export interface SearchAccountRequest{
  displayName : string;
  email : string;
  phoneNumbebr : string;
  roleID: string;
  limit: number;
  page: number;
  sortField: string;
  sortOrder: number;
}
export interface SearchOrderRequest{
  limit: number;
  page: number;
  search: string;
  sortField: string;
  sortOrder: number;
  address: string;
  phone: string;
}
