import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Test } from 'src/entities/test.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  questionText: string;

  @Column({ nullable: true })
  correctAnswer: string;

  @Column({ type: 'simple-array', nullable: true })
  options: string[];

  @Column({ default: 1 })
  points: number;

  @ManyToOne(() => Test, (test) => test.questions, { onDelete: 'CASCADE' })
  test: Test;
}