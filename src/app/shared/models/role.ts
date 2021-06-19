import { Account } from "./account";

export interface Role {
    id: number;
    roleName: string;
    accounts?: Account[];
}
