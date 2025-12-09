import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { TestResult } from '../entities/test-result.entity';

@Injectable()
export class CustomLeaderboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TestResult)
    private readonly testResultRepository: Repository<TestResult>,
  ) {}

  async getTopScores(limit: number = 10) {
    const users = await this.userRepository.find({
      order: { totalScore: 'DESC' },
      take: limit,
      relations: ['testResults', 'testResults.test'],
    });

    return users.map((user, index) => {
      // oxirgi test natijasi
      const lastResult = user.testResults?.length
        ? user.testResults[user.testResults.length - 1]
        : null;

      return {
        userID: user.id,
        rank: index + 1,
        studentName: user.fullName || user.username,
        email: user.email,
        testType: lastResult?.test?.type,
        bandScore: user.totalScore,
        date: lastResult
          ? lastResult.completedAt.toISOString().slice(0, 10) // YYYY-MM-DD format
          : null,
      };
    });
  }
}
