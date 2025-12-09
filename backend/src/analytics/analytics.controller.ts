import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics')
@Controller('admin/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('platform-stats')
  @ApiOperation({
    summary: 'Platform statistikasi',
    description: 'Jami foydalanuvchilar, testlar, premium foydalanuvchilar sonini olish',
  })
  @ApiResponse({
    status: 200,
    description: 'Platform statistikasi muvaffaqiyatli olindi',
    schema: {
      example: {
        totalUsers: 1500,
        newUsersToday: 25,
        dailyActiveUsers: 450,
        totalTests: 120,
        completedTests: 3500,
        premiumUsers: 300,
      },
    },
  })
  getPlatformStats() {
    return this.analyticsService.getPlatformStats();
  }

  @Get('today-stats')
  @ApiOperation({
    summary: 'Bugungi kun statistikasi',
    description: 'Bugun ro\'yxatdan o\'tgan userlar, topshirilgan testlar va aktiv userlar',
  })
  @ApiResponse({
    status: 200,
    description: 'Bugungi kun statistikasi muvaffaqiyatli olindi',
    schema: {
      example: {
        date: '2024-12-08',
        newUsers: 15,
        completedTests: 45,
        activeUsers: 28,
      },
    },
  })
  getTodayStats() {
    return this.analyticsService.getTodayStats();
  }

  @Get('daily-stats')
  @ApiOperation({
    summary: 'Kunlik statistika',
    description: 'Oxirgi 7 kun davomida kunlik statistika',
  })
  @ApiResponse({
    status: 200,
    description: 'Kunlik statistika muvaffaqiyatli olindi',
    schema: {
      example: [
        {
          date: '2024-01-01',
          newUsers: 25,
          completedTests: 120,
        },
      ],
    },
  })
  getDailyStats() {
    return this.analyticsService.getDailyStats();
  }

  @Get('user-analytics')
  @ApiOperation({
    summary: 'Foydalanuvchi analitikasi',
    description: 'Barcha foydalanuvchilarning test ishlash statistikasi',
  })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi analitikasi muvaffaqiyatli olindi',
    schema: {
      example: [
        {
          id: 'uuid-1',
          username: 'john_doe',
          email: 'john@example.com',
          createdAt: '2024-01-01T10:00:00Z',
          testCount: 45,
          averageScore: 78.5,
          hasPremium: true,
          premiumExpiresAt: '2024-12-31T23:59:59Z',
        },
      ],
    },
  })
  getUserAnalytics() {
    return this.analyticsService.getUserAnalytics();
  }
}
