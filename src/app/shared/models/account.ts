import { Role } from "./role";

export interface Account {
  accountId: string;
  phoneNumber: string;
  email: string;
  displayName: string;
  description: string;
  photoUrl: string;
  role: Role;
  lastLogin: Date;
}
