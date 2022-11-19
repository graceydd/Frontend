export interface IUserFormValues {
    username: string;
    password: string;
}

export class UserFormValues {
    username: string = "";
    password: string = "";
}

export interface IRefreshToken {
    refreshToken: string;
}

export class CustomerRegistration {
    username: string = "";
    email: string = "";
    password: string = "";
    address: string = "";
    phoneNumber: string = "";
}

export class Customer {
    userId?: number;
    username: string = "";
    email: string = "";
    address: string = "";
    phoneNumber: string = "";
}