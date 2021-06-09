// export interface SearchRequest {
//   limit: number;
//   page: number;
//   search: string;
//   sortField: string;
//   sortOrder: number;
//   //1: descending
//   //0: ascending
// }
export interface SearchAccountRequest{
  internalCode : string;
  displayName : string;
  email : string;
  phoneNumber : string;
  roleID: string;
  limit: number;
  page: number;
  sortField: string;
  sortOrder: number;
}
// export interface SearchOrderRequest{
//   limit: number;
//   page: number;
//   search: string;
//   sortField: string;
//   sortOrder: number;
//   address: string;
//   phone: string;
// }

export interface ValueCompare {
  value: string;
  compare: string;
}

export interface SearchRequest {
  Limit: number;
  Page: number;
  SortField: string;
  SortOrder: number;
  SearchValue: Record<string, ValueCompare>; 
  SelectFields: string;
}