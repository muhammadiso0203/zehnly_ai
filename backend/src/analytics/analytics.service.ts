import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { User } from '../entities/user.entity';
import { Test } from '../entities/test.entity';
import { TestResult } from '../entities/test-result.entity';

export interface PlatformStats {
  totalUsers: number;
  newUsersToday: number;
  dailyActiveUsers: number;
  totalTests: number;
  completedTests: number;
  premiumUsers: number;
}

export interface DailyStats {
  date: string;
  newUsers: number;
  completedTests: number;
}

export interface TodayStats {
  date: string;
  newUsers: number;
  completedTests: number;
  activeUsers: number;
}

export interface UserAnalytics {
  id: string;
  username: string;
  email: string;
  fullName: string;
  createdAt: Date;
  testCount: number;
  averageScore: number;
  hasPremium: boolean;
  premiumExpiresAt: Date | null;
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(TestResult)
    private readonly testResultRepository: Repository<TestResult>,
  ) {}

  
  async getPlatformStats(): Promise<PlatformStats> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalUsers = await this.userRepository.count();

    const newUsersToday = await this.userRepository.count({
      where: {
        createdAt: MoreThanOrEqual(today),
      },
    });

    const dailyActiveUsers = await this.testResultRepository
      .createQueryBuilder('result')
      .select('COUNT(DISTINCT result.userId)', 'count')
      .where('result.completedAt >= :today', { today })
      .getRawOne()
      .then((result) => parseInt(result.count) || 0);

    const totalTests = await this.testRepository.count();

    const completedTests = await this.testResultRepository.count();

    const premiumUsers = await this.userRepository.count({
      where: {
        hasPremium: true,
      },
    });

    return {
      totalUsers,
      newUsersToday,
      dailyActiveUsers,
      totalTests,
      completedTests,
      premiumUsers,
    };
  }

  async getTodayStats(): Promise<TodayStats> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const newUsers = await this.userRepository
      .createQueryBuilder('user')
      .where('user.createdAt >= :today', { today })
      .andWhere('user.createdAt < :tomorrow', { tomorrow })
      .getCount();

    const completedTests = await this.testResultRepository
      .createQueryBuilder('result')
      .where('result.completedAt >= :today', { today })
      .andWhere('result.completedAt < :tomorrow', { tomorrow })
      .getCount();

    const activeUsers = await this.testResultRepository
      .createQueryBuilder('result')
      .select('COUNT(DISTINCT result.userId)', 'count')
      .where('result.completedAt >= :today', { today })
      .andWhere('result.completedAt < :tomorrow', { tomorrow })
      .getRawOne()
      .then((result) => parseInt(result.count) || 0);

    return {
      date: today.toISOString().split('T')[0],
      newUsers,
      completedTests,
      activeUsers,
    };
  }

 
  async getDailyStats(): Promise<DailyStats[]> {
    const stats: DailyStats[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const newUsers = await this.userRepository
        .createQueryBuilder('user')
        .where('user.createdAt >= :date', { date })
        .andWhere('user.createdAt < :nextDate', { nextDate })
        .getCount();

      const completedTests = await this.testResultRepository
        .createQueryBuilder('result')
        .where('result.completedAt >= :date', { date })
        .andWhere('result.completedAt < :nextDate', { nextDate })
        .getCount();

      stats.push({
        date: date.toISOString().split('T')[0],
        newUsers,
        completedTests,
      });
    }

    return stats;
  }

  
  async getUserAnalytics(): Promise<UserAnalytics[]> {
    const users = await this.userRepository.find({
      relations: ['testResults'],
      order: {
        createdAt: 'DESC',
      },
    });

    return users.map((user) => {
      const testCount = user.testResults?.length || 0;
      const totalScore = user.testResults?.reduce(
        (sum, result) => sum + result.score,
        0,
      ) || 0;
      const averageScore = testCount > 0 ? Math.round(totalScore / testCount) : 0;

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName || '',
        createdAt: user.createdAt,
        testCount,
        averageScore,
        hasPremium: user.hasPremium,
        premiumExpiresAt: user.premiumExpiresAt || null,
      };
    });
  }
}
