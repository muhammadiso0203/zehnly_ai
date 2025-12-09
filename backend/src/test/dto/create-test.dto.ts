import { IsString, IsNumber, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum TestType {
  ENGLISH = 'English',
  MATH = 'Math'
}

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum TestCategory {
  IELTS = 'ielts',
  TOEFL = 'toefl',
  CEFR = 'cefr',
  GENERAL_ENGLISH = 'general_english',
  BUSINESS_ENGLISH = 'business_english',
  GRAMMAR = 'grammar',
  VOCABULARY = 'vocabulary',
  READING = 'reading',
  LISTENING = 'listening',
  SPEAKING = 'speaking',
  WRITING = 'writing',
}

export class QuestionDto {
  @ApiProperty({
    description: 'Savol matni',
    example: 'What is the capital of France?',
  })
  @IsString()
  questionText: string;

  @ApiProperty({
    description: 'To\'g\'ri javob',
    example: 'Paris',
  })
  @IsString()
  correctAnswer: string;

  @ApiProperty({
    description: 'Variantlar (multiple choice uchun)',
    example: ['Paris', 'London', 'Berlin', 'Madrid'],
    required: false,
  })
  @IsArray()
  options?: string[];

  @ApiProperty({
    description: 'Savolning ballari',
    example: 1,
  })
  @IsNumber()
  points: number;
}

export class CreateTestDto {
  @ApiProperty({
    description: 'Test sarlavhasi',
    example: 'Matematik asoslari',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Test tavsifi',
    example: 'Matematik fanining asosiy tushunchalarini tekshirish',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Test kategoriyasi (yo\'nalishi)',
    enum: TestCategory,
    example: TestCategory.IELTS,
  })
  @IsEnum(TestCategory)
  category: TestCategory;

  @ApiProperty({
    description: 'Test turi',
    enum: TestType,
    example: TestType.ENGLISH,
  })
  @IsEnum(TestType)
  type: TestType;

  @ApiProperty({
    description: 'Qiyinlik darajasi',
    enum: DifficultyLevel,
    example: DifficultyLevel.MEDIUM,
  })
  @IsEnum(DifficultyLevel)
  difficultyLevel: DifficultyLevel;

  @ApiProperty({
    description: 'Test davomiyligi (minutlarda)',
    example: 60,
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: 'Jami savollar soni',
    example: 20,
  })
  @IsNumber()
  totalQuestions: number;

  @ApiProperty({
    description: 'O\'tish bali foiz (0-100)',
    example: 70,
  })
  @IsNumber()
  passingScorePercentage: number;

  @ApiProperty({
    description: 'Savollar ro\'yxati',
    type: [QuestionDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
