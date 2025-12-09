import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@ApiTags('Tests')
@Controller('admin/tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('practice')
  @ApiOperation({
    summary: 'Practice uchun barcha testlarni olish',
    description: 'Formatlangan ma\'lumotlar bilan (title, type, level, questions, duration, attempts)',
  })
  @ApiResponse({
    status: 200,
    description: 'Practice testlari muvaffaqiyatli olindi',
    schema: {
      example: [
        {
          id: 'uuid-1',
          title: 'IELTS Reading Practice',
          type: 'English',
          level: 'Intermediate',
          status: 'Published',
          questions: 40,
          duration: 60,
          attempts: 1234,
        },
      ],
    },
  })
  getAllTestsPractice() {
    return this.testService.getAllTestsPractice();
  }

  @Get()
  @ApiOperation({
    summary: 'Barcha testlarni olish',
    description: 'Platformadagi barcha testlarni savollar bilan olish',
  })
  @ApiResponse({
    status: 200,
    description: 'Testlar muvaffaqiyatli olindi',
  })
  getAllTests() {
    return this.testService.getAllTests();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Test UUID identifikatori',
  })
  @ApiOperation({
    summary: 'Bitta testni olish',
    description: 'ID bo\'yicha test va uning savollarini olish',
  })
  @ApiResponse({
    status: 200,
    description: 'Test muvaffaqiyatli olindi',
  })
  @ApiResponse({
    status: 404,
    description: 'Test topilmadi',
  })
  getTestById(@Param('id') id: string) {
    return this.testService.getTestById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Yangi test yaratish',
    description: 'Yangi test savollar bilan birga yaratish',
  })
  @ApiResponse({
    status: 201,
    description: 'Test muvaffaqiyatli yaratildi',
  })
  createTest(@Body() dto: CreateTestDto) {
    return this.testService.createTest(dto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Test UUID identifikatori',
  })
  @ApiOperation({
    summary: 'Testni yangilash',
    description: 'Test ma\'lumotlarini va savollarini yangilash',
  })
  @ApiResponse({
    status: 200,
    description: 'Test muvaffaqiyatli yangilandi',
  })
  updateTest(@Param('id') id: string, @Body() dto: UpdateTestDto) {
    return this.testService.updateTest(id, dto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Test UUID identifikatori',
  })
  @ApiOperation({
    summary: 'Testni o\'chirish',
    description: 'Testni va uning barcha savollarini o\'chirish',
  })
  @ApiResponse({
    status: 200,
    description: 'Test muvaffaqiyatli o\'chirildi',
  })
  deleteTest(@Param('id') id: string) {
    return this.testService.deleteTest(id);
  }
}