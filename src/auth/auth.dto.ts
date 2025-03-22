import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  name: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: '12345678' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: '12345678'})
  @IsNotEmpty()
  @IsString()
  password: string;
}
