import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    } | {
        message: string;
    }>;
    googleLogin(credential: string): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    getProfile(req: any): Promise<import("../users/entities/user.entity").User | null>;
}
