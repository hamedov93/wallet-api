import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, Min } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWalletDto {
  @ApiProperty({ type: String, description: 'Three letter currency code', example: 'SAR', examples: ['SAR', 'AED', 'USD'] })
  @IsNotEmpty()
  @IsString()
  @MaxLength(3)
  currency: string;
}

export class ChangeBalanceDto {
  @ApiProperty({ type: 'integer', description: 'Wallet ID from wallets endpoint'})
  @IsInt()
  @IsNotEmpty()
  walletId: number;

  @ApiProperty({ type: 'number', description: 'Enter amount, must be more than 0' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;
}
