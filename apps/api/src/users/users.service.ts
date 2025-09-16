// 📂 src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  // createWithGoogle(payload: any): User | PromiseLike<User | null> | null {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async createWithGoogle(payload: any) {
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
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const userRoles = createUserDto.roles
      ? await this.rolesRepository.findByIds(createUserDto.roles)
      : [];

    const newUser = this.usersRepository.create({
      id: uuidv4(),
      ...createUserDto,
      password: hashedPassword,
      roles: userRoles,
    });
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email }, relations: ['roles'] });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['roles'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async findById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }
  

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.roles) {
      const roles = await this.rolesRepository.findByIds(updateUserDto.roles);
      user.roles = roles;
    }

    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); 
    await this.usersRepository.delete({ id });
  }
}
