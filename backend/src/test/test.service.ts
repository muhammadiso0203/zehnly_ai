import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from '../entities/test.entity';
import { Question } from '../entities/question.entity';
import { TestResult } from 'src/entities/test-result.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(TestResult)
    private readonly testResultRepository: Repository<TestResult>,
  ) {}

  async getAllTestsPractice() {
    const tests = await this.testRepository.find({
      relations: ['questions'],
      order: { createdAt: 'DESC' },
    });

    return tests.map((test) => ({
      id: test.id,
      title: test.title,
      type: test.type,
      level: test.difficultyLevel,
      status: test.status,
      questions: test.questions?.length || test.totalQuestions || 0,
      duration: test.duration,
    }));
  }

  async createTest(dto: CreateTestDto): Promise<Test> {
    const test = this.testRepository.create({
      title: dto.title,
      description: dto.description,
      category: dto.category,
      type: dto.type,
      difficultyLevel: dto.difficultyLevel,
      duration: dto.duration,
      totalQuestions: dto.totalQuestions,
      passingScorePercentage: dto.passingScorePercentage,
    });

    const savedTest = await this.testRepository.save(test);

    if (dto.questions && dto.questions.length > 0) {
      const questions = dto.questions.map((questionDto) => {
        return this.questionRepository.create({
          questionText: questionDto.questionText,
          correctAnswer: questionDto.correctAnswer,
          options: questionDto.options || [],
          points: questionDto.points,
          test: savedTest,
        });
      });

      await this.questionRepository.save(questions);
    }

    const fullTest = await this.testRepository.findOne({
      where: { id: savedTest.id },
      relations: ['questions'],
    });

    if (!fullTest) {
      throw new NotFoundException('Test yaratildi, lekin qayta topilmadi');
    }

    return fullTest;
  }

  async getAllTests(): Promise<Test[]> {
    return await this.testRepository.find({
      relations: ['questions'],
      order: { createdAt: 'DESC' },
    });
  }

  async getTestById(id: string): Promise<Test> {
    const test = await this.testRepository.findOne({
      where: { id },
      relations: ['questions'],
    });

    if (!test) {
      throw new NotFoundException(`ID ${id} bo'lgan test topilmadi`);
    }

    return test;
  }

  async updateTest(id: string, dto: UpdateTestDto): Promise<Test> {
    const test = await this.getTestById(id);

    if (dto.title) test.title = dto.title;
    if (dto.description) test.description = dto.description;
    if (dto.category) test.category = dto.category;
    if (dto.type) test.type = dto.type;
    if (dto.difficultyLevel) test.difficultyLevel = dto.difficultyLevel;
    if (dto.duration) test.duration = dto.duration;
    if (dto.totalQuestions) test.totalQuestions = dto.totalQuestions;
    if (dto.passingScorePercentage) {
      test.passingScorePercentage = dto.passingScorePercentage;
    }

    await this.testRepository.save(test);

    if (dto.questions && dto.questions.length > 0) {
      await this.questionRepository.delete({ test: { id } });

      const questions = dto.questions.map((questionDto) => {
        return this.questionRepository.create({
          questionText: questionDto.questionText,
          correctAnswer: questionDto.correctAnswer,
          options: questionDto.options || [],
          points: questionDto.points,
          test: test,
        });
      });

      await this.questionRepository.save(questions);
    }

    return this.getTestById(id);
  }

  async deleteTest(id: string): Promise<{ message: string }> {
    await this.testResultRepository.delete({ test: { id } });

    await this.questionRepository.delete({ test: { id } });

    await this.testRepository.delete({ id });

    return { message: `ID ${id} bo'lgan test muvaffaqiyatli o'chirildi` };
  }
}
