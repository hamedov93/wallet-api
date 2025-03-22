import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto, SignupDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from './decorators/auth-user.decorator';
import { User } from 'src/user/user.entity';
import { UserDto } from 'src/user/user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    await this.authService.signup(dto);

    // Queue a job to send email verification link (skipped for simplicity)

    return {
      message: "Account created successfully",
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() dto: LoginDto, @AuthUser() user: User) {
    // Authentication is handled in local strategy and user assigned to the request context
    const accessToken = await this.authService.generateAccessToken(user);

    return {
      user: new UserDto(user),
      accessToken,
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async user(@AuthUser() user: User) {
    return new UserDto(user);
  }
}
