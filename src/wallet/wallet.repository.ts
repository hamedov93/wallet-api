import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletRepository extends Repository<Wallet> {
  constructor(private readonly entityManager: EntityManager) {
    super(Wallet, entityManager);
  }
}
