import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { WalletRepository } from './wallet.repository';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly walletRepository: WalletRepository,
  ) {}

  createWallet(userId: number, currency: string) {
    if (!['SAR', 'AED', 'USD'].includes(currency)) {
      throw new BadRequestException('Currency not supported');
    }

    return this.walletRepository.save({ userId, currency, balance: 0 });
  }

  async topup(userId: number, walletId: number, amount: number) {
    if (amount <= 0) throw new BadRequestException('Please enter a valid amount.');
    // The following increment query is atomic by default in SQL (set balance = balance + amount)
    // Therefore we shouldn't worry about race conditions
    await this.walletRepository.increment({ id: walletId, userId }, 'balance', amount);
  }

  async charge(userId: number, walletId: number, amount: number) {
    if (amount <= 0) throw new BadRequestException('Please enter a valid amount.');
    // To avoid negative balance we need to check for available balance first.
    // But this might result in race condition when reading at the same time.
    // We'll be utilizing pessimistic read lock to prevnet this.
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const wallet = await entityManager.findOne(Wallet, {
        where: { id: walletId, userId },
        // lock: { mode: 'pessimistic_read' }, Locking not supported in SQLite
        // But for other database drivers, it should be utilized.
      });

      if (!wallet) throw new NotFoundException('Wallet not found');

      amount = Math.round(amount * 10000) / 10000; // Round to max currency decimals

      if (amount > wallet.balance) {
        throw new BadRequestException('Not enough balance.');
      }

      await entityManager.decrement(Wallet, { id: walletId, userId }, 'balance', amount);
    });
  }

  getWallets(userId: number) {
    return this.walletRepository.findBy({ userId });
  }

  async getWallet(walletId: number, userId: number) {
    const wallet = await this.walletRepository.findOneBy({ id: walletId, userId });
    if (!wallet) throw new NotFoundException('Wallet not found');

    return wallet;
  }
}
