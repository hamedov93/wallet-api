import { User } from './user.entity';

export class UserDto {
  name: string;
  email: string;
  active: boolean;
  isVerified: boolean;
  registrationDate: Date;
  lastUpdate: Date;

  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
    this.active = user.active;
    this.isVerified = !!user.emailVerifiedAt;
    this.registrationDate = user.createdAt;
    this.lastUpdate = user.updatedAt;
  }
}
