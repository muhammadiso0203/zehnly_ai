import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from 'src/entities/question.entity';
import { TestResult } from 'src/entities/test-result.entity';

export enum TestType {
  ENGLISH = 'English',
  MATH = 'Math',
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
export enum TestStatus{
  PUBLISHED = "Published",
  DRAFT = "Draft"
}

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TestCategory })
  category: TestCategory;

  @Column({ type: 'enum', enum: TestType })
  type: TestType;

  @Column({type: "enum", enum: TestStatus})
  status:TestStatus;

  @Column({ type: 'enum', enum: DifficultyLevel })
  difficultyLevel: DifficultyLevel;

  @Column()
  duration: number;  

  @Column()
  totalQuestions: number;

  @Column()
  passingScorePercentage: number; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Question, (question) => question.test, { cascade: true })
  questions: Question[];

  @OneToMany(() => TestResult, (result) => result.test,{cascade: true, onDelete: 'CASCADE'})
  results: TestResult[];
}
