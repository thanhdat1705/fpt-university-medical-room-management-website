import { Role } from "./role";

export interface Account {
  Id: string;
  internalCode: string;
  phoneNumber: string;
  email: string;
  displayName: string;
  description: string;
  photoUrl: string;
  roleId: number;
  role?: Role;
  lastLogin: Date;
  active: boolean
}
