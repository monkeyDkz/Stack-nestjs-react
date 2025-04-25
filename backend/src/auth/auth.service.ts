import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { OAuth2Client } from 'google-auth-library';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ConflictException } from '@nestjs/common/exceptions/conflict.exception';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

 

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, { secret: 'refreshSecretKey', expiresIn: '7d' });
  
    return {
      access_token,
      refresh_token,
    };
  }
  async register(createUserDto: CreateUserDto) {
    const existing = await this.usersService.findOneByEmail(createUserDto.email);
    if (existing) {
      throw new ConflictException('Email already exists');
    }
    return this.usersService.create(createUserDto);
  }

  async loginWithGoogle(credential: string) {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.email) throw new UnauthorizedException('Invalid Google token');

    let user = await this.usersService.findOneByEmail(payload.email);

    if (!user) {
      user = await this.usersService.createWithGoogle(payload);
    }

    const jwt = this.jwtService.sign({ sub: user.id, email: user.email });
    return { access_token: jwt };
  }
}