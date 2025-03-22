import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private entityManager: EntityManager) {
    super(User, entityManager);
  }
}
