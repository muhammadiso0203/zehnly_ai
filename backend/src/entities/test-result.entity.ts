import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Test } from 'src/entities/test.entity';

@Entity('test_results')
export class TestResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  score: number;

  @Column()
  scorePercentage: number;

  @Column()
  isPassed: boolean;

  @Column()
  timeTaken: number; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  completedAt: Date;

  @ManyToOne(() => User, (user) => user.testResults)
  user: User;

  @ManyToOne(() => Test, (test) => test.results)
  test: Test;
}