import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdatePremiumDto } from './dto/update-premium.dto';

@ApiTags('Users')
@Controller('admin/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Barcha foydalanuvchilarni olish',
    description: 'Platformadagi barcha foydalanuvchilarni olish',
  })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchilar muvaffaqiyatli olindi',
    schema: {
      example: [
        {
          id: 'uuid-1',
          username: 'john_doe',
          email: 'john@example.com',
          fullName: 'John Doe',
          createdAt: '2024-01-01T10:00:00Z',
          hasPremium: true,
          premiumExpiresAt: '2024-12-31T23:59:59Z',
        },
      ],
    },
  })
  getAllUsers() {
    return this.userService.getAllUser();
  }

  @Get('premium')
  @ApiOperation({
    summary: 'Premium foydalanuvchilarni olish',
    description: 'Faqat premium abonenti bo\'lgan foydalanuvchilarni olish',
  })
  @ApiResponse({
    status: 200,
    description: 'Premium foydalanuvchilar muvaffaqiyatli olindi',
    schema: {
      example: [
        {
          id: 'uuid-1',
          username: 'john_doe',
          email: 'john@example.com',
          fullName: 'John Doe',
          createdAt: '2024-01-01T10:00:00Z',
          hasPremium: true,
          premiumExpiresAt: '2024-12-31T23:59:59Z',
        },
      ],
    },
  })
  getPremiumUsers() {
    return this.userService.getPremiumUsers();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Foydalanuvchining UUID identifikatori',
  })
  @ApiOperation({
    summary: 'Bitta foydalanuvchini olish',
    description: 'ID bo\'yicha bitta foydalanuvchini olish',
  })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi muvaffaqiyatli olindi',
  })
  @ApiResponse({
    status: 404,
    description: 'Foydalanuvchi topilmadi',
  })
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id/premium')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Foydalanuvchining UUID identifikatori',
  })
  @ApiOperation({
    summary: 'Premium statusni yangilash',
    description: 'Foydalanuvchining premium statusini va muddatini yangilash',
  })
  @ApiResponse({
    status: 200,
    description: 'Premium status muvaffaqiyatli yangilandi',
  })
  updatePremium(@Param('id') id: string, @Body() dto: UpdatePremiumDto) {
    return this.userService.updatePremium(id, dto);
  }
}