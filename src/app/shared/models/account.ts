export interface Account {
  id: string;
  email: string;
  photoUrl: string;
  displayName: string;
  token: string;
  phoneNumber: string;
  description: string;
  role: string;

}
export interface AccountOwner extends Account {
  iconStoreUrl: string;

}
