import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomLeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { User } from '../entities/user.entity';
import { TestResult } from '../entities/test-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, TestResult])],
  controllers: [LeaderboardController],
  providers: [CustomLeaderboardService],
  exports: [CustomLeaderboardService],
})
export class LeaderboardModule {}
