import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { User } from '../entities/user.entity';
import { Test } from '../entities/test.entity';
import { TestResult } from '../entities/test-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Test, TestResult])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
