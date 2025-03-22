import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { User } from 'src/user/user.entity';
import { ChangeBalanceDto, CreateWalletDto } from './wallet.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/v1/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('topup')
  async topup(@Body() dto: ChangeBalanceDto, @AuthUser() user: User) {
    console.log(dto);
    await this.walletService.topup(user.id, dto.walletId, dto.amount);

    return {
      message: "Balance topped up successfully",
    };
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('charge')
  async charge(@Body() dto: ChangeBalanceDto, @AuthUser() user: User) {
    await this.walletService.charge(user.id, dto.walletId, dto.amount);

    return {
      message: 'Balance charged successfully',
    };
  }

  /**
   * Create wallet
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createWallet(@Body() dto: CreateWalletDto, @AuthUser() user: User) {
    return this.walletService.createWallet(user.id, dto.currency);
  }

  /**
   * Get list of wallets
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async wallets(@AuthUser() user: User) {
    return this.walletService.getWallets(user.id);
  }

  /**
   * Get wallet by ID
   */
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async wallet(@AuthUser() user: User, @Param('id') id: number) {
    return this.walletService.getWallet(id, user.id);
  }
}
