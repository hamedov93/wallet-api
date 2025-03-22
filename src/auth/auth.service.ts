import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupDto } from './auth.dto';
import * as argon2 from 'argon2';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async signup(dto: SignupDto) {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email address already in use.');
    }

    return this.userService.create(dto);
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Incorrect email or password.');

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) throw new UnauthorizedException('Incorrect email or password.');

    if (!user.active) {
      throw new UnauthorizedException('Account is disabled.');
    }

    return user;
  }

  async generateAccessToken(user: User) {
    return this.jwtService.sign({
      name: user.name,
      email: user.email,
      sub: user.id,
    });
  }
}
