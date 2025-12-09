import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CustomLeaderboardService } from './leaderboard.service';

@ApiTags('Leaderboard')
@Controller('admin/leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: CustomLeaderboardService) {}

  @Get('top-scores')
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Top n foydalanuvchi (default: 10)',
  })
  @ApiOperation({
    summary: "Eng yaxshi o'yinchilar reytingi",
    description: "Eng ko'p ball to'plagan foydalanuvchilarni olish",
  })
  @ApiResponse({
    status: 200,
    description: "Top o'yinchilar muvaffaqiyatli olindi",
    schema: {
      example: [
        {
          rank: 1,
          username: 'alex_pro',
          totalScore: 2500,
          testCount: 50,
          averageScore: 92.5,
        },
      ],
    },
  })
  getTopScores(@Query('limit') limit: number = 10) {
    return this.leaderboardService.getTopScores(limit);
  }
}
