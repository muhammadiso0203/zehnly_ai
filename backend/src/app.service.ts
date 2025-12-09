// app.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Test } from 'src/entities/test.entity';
import { TestResult } from 'src/entities/test-result.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Test) private testRepo: Repository<Test>,
    @InjectRepository(TestResult) private resultRepo: Repository<TestResult>,
  ) {}

  getHello(): string {
    return 'Admin Panel API xush kelibsiz!';
  }

  async getHealth() {
    try {
      const userCount = await this.userRepo.count();
      const testCount = await this.testRepo.count();
      const resultCount = await this.resultRepo.count();

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'Admin Panel API ishlayapti',
        database: {
          status: 'connected',
          users: userCount,
          tests: testCount,
          completedTests: resultCount,
        },
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'Database ulanishida xatolik',
        error: error.message,
      };
    }
  }

  async getApiInfo() {
    const totalUsers = await this.userRepo.count();
    const totalTests = await this.testRepo.count();
    const totalResults = await this.resultRepo.count();

    return {
      name: 'Admin Panel API',
      version: '1.0.0',
      description: 'Admin paneli uchun to\'liq API',
      uptime: process.uptime(),
      statistics: {
        totalUsers,
        totalTests,
        completedTests: totalResults,
      },
      endpoints: {
        health: 'GET /',
        info: 'GET /info',
        analytics: {
          platformStats: 'GET /admin/analytics/platform-stats',
          dailyStats: 'GET /admin/analytics/daily-stats',
          userAnalytics: 'GET /admin/analytics/user-analytics',
        },
        users: {
          getAllUsers: 'GET /admin/users',
          getUserById: 'GET /admin/users/:id',
          updatePremium: 'PUT /admin/users/:id/premium',
        },
        tests: {
          getAllTests: 'GET /admin/tests',
          getTestById: 'GET /admin/tests/:id',
          createTest: 'POST /admin/tests',
          updateTest: 'PUT /admin/tests/:id',
          deleteTest: 'DELETE /admin/tests/:id',
        },
        leaderboard: {
          topScores: 'GET /admin/leaderboard/top-scores',
        },
      },
      documentation: 'http://localhost:3000/api-docs',
    };
  }
}