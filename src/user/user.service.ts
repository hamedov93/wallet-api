import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import type { CreateUserInput } from './user.type';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(input: CreateUserInput) {
    input.password = await argon2.hash(input.password, { type: argon2.argon2id });
    return this.userRepository.save(input);
  }

  findById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
