export interface User  {
    name: string;
    email: string;
    password: string;
    phone: string | null;
}

export interface UserBD {
    name: string;
    email: string;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: number;
}