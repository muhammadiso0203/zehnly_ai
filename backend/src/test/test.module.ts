import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Test } from '../entities/test.entity';
import { Question } from '../entities/question.entity';
import { TestResult } from '../entities/test-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Question, TestResult])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}