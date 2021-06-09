export interface InsertAccountRequest{
  interncalCode: string,
  displayName: string,
  email: string,
  username: string,
  password: string,
  active: boolean,
  roleId: number
}