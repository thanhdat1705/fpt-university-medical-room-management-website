export interface AccountDetailResponse{
    accountId: string;
    phoneNumber: string;
    email: string;
    displayName: string;
    description: string;
    photoUrl: string;
    role: Role;
    lastLogin: Date;
}

export interface Account {
    id: string;
    internalCode: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    description: string;
    photoUrl: string;
    lastLogin: Date;
    active: boolean;
    roleId: number;
    accountSocials?: any;
    accountUsernames?: any;
    patients?: any;
}

export interface Role {
    id: number;
    roleName: string;
    accounts: Account[];
}

export interface Data {

}



