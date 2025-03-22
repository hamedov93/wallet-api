import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Unique(['userId', 'currency'])
@Entity({ name: 'wallet' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unsigned: true })
  userId: number;

  @Column()
  currency: string;

  @Column({ type: 'decimal', precision: 19, scale: 4, default: 0, unsigned: true })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
