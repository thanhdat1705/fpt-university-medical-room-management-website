import { Role } from "./role";

export interface Account {
  Id: string;
  phoneNumber: string;
  email: string;
  displayName: string;
  description: string;
  photoUrl: string;
  role: Role;
  lastLogin: Date;
}
