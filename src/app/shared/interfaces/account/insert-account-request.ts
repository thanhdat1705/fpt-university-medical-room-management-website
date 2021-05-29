export interface InsertAccountRequest{
  displayName: string,
  email: string,
  username: string,
  password: string,
  active: boolean,
  roleId: number
}