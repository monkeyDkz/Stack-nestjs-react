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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const role_entity_1 = require("./entities/role.entity");
const bcrypt = require("bcryptjs");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    usersRepository;
    rolesRepository;
    constructor(usersRepository, rolesRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
    }
    async createWithGoogle(payload) {
        const [firstname, ...lastnameParts] = (payload.name || '').split(' ');
        const lastname = lastnameParts.join(' ');
        const password = await bcrypt.hash(Math.random().toString(36), 10);
        return this.usersRepository.save({
            email: payload.email,
            firstname: firstname || 'GoogleUser',
            lastname: lastname || '',
            password,
            avatar: payload.picture,
            isGoogleUser: true,
        });
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const userRoles = createUserDto.roles
            ? await this.rolesRepository.findByIds(createUserDto.roles)
            : [];
        const newUser = this.usersRepository.create({
            id: (0, uuid_1.v4)(),
            ...createUserDto,
            password: hashedPassword,
            roles: userRoles,
        });
        return this.usersRepository.save(newUser);
    }
    findAll() {
        return this.usersRepository.find({ relations: ['roles'] });
    }
    async findOneByEmail(email) {
        return await this.usersRepository.findOne({ where: { email }, relations: ['roles'] });
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({ where: { id }, relations: ['roles'] });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async findById(id) {
        return this.usersRepository.findOneBy({ id });
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.roles) {
            const roles = await this.rolesRepository.findByIds(updateUserDto.roles);
            user.roles = roles;
        }
        Object.assign(user, updateUserDto);
        await this.usersRepository.save(user);
        return this.findOne(id);
    }
    async remove(id) {
        await this.findOne(id);
        await this.usersRepository.delete({ id });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map