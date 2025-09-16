import { Role } from './role.entity';
export declare class User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    roles: Role[];
}
