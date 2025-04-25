import { UsersService } from './users/users.service';
export declare class AppController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<import("./users/entities/user.entity").User | null>;
}
