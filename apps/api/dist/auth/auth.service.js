"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const google_auth_library_1 = require("google-auth-library");
const bcrypt = require("bcryptjs");
const conflict_exception_1 = require("@nestjs/common/exceptions/conflict.exception");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findOneByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id, roles: user.roles };
        const access_token = this.jwtService.sign(payload);
        const refresh_token = this.jwtService.sign(payload, { secret: 'refreshSecretKey', expiresIn: '7d' });
        return {
            access_token,
            refresh_token,
        };
    }
    async register(createUserDto) {
        const existing = await this.usersService.findOneByEmail(createUserDto.email);
        if (existing) {
            throw new conflict_exception_1.ConflictException('Email already exists');
        }
        return this.usersService.create(createUserDto);
    }
    async loginWithGoogle(credential) {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload?.email)
            throw new common_1.UnauthorizedException('Invalid Google token');
        let user = await this.usersService.findOneByEmail(payload.email);
        if (!user) {
            user = await this.usersService.createWithGoogle(payload);
        }
        const jwt = this.jwtService.sign({ sub: user.id, email: user.email });
        return { access_token: jwt };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map