import { DataSource } from 'typeorm';
import { appConfig } from './config/database.config';
import { User } from './entities/user.entity';
import { Test, TestType, DifficultyLevel, TestCategory, TestStatus } from './entities/test.entity';
import { TestResult } from './entities/test-result.entity';
import { Question } from './entities/question.entity';
import * as bcrypt from 'bcrypt';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: appConfig.dbUrl,
  entities: [User, Test, TestResult, Question],
  synchronize: true,
  ssl:
    appConfig.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

const seedUsers = async () => {
  console.log('🌱 Starting database seeding...');

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const userRepository = AppDataSource.getRepository(User);
    const testRepository = AppDataSource.getRepository(Test);
    const testResultRepository = AppDataSource.getRepository(TestResult);
    const questionRepository = AppDataSource.getRepository(Question);

    const createdUsers: User[] = [];
    const leaderboardData: any[] = [];

    const usersData = [
      { username: 'user1', email: 'user1@example.com', password: 'password123', fullName: 'User One', hasPremium: false, premiumDays: 0 },
      { username: 'user2', email: 'user2@example.com', password: 'password123', fullName: 'User Two', hasPremium: true, premiumDays: 30 },
      { username: 'user3', email: 'user3@example.com', password: 'password123', fullName: 'User Three', hasPremium: false, premiumDays: 0 },
      { username: 'premium1', email: 'premium1@example.com', password: 'password123', fullName: 'Premium One', hasPremium: true, premiumDays: 30 },
      { username: 'premium2', email: 'premium2@example.com', password: 'password123', fullName: 'Premium Two', hasPremium: true, premiumDays: 30 },
      { username: 'premium3', email: 'premium3@example.com', password: 'password123', fullName: 'Premium Three', hasPremium: true, premiumDays: 30 },
      { username: 'premium4', email: 'premium4@example.com', password: 'password123', fullName: 'Premium Four', hasPremium: true, premiumDays: 30 },
      { username: 'premium5', email: 'premium5@example.com', password: 'password123', fullName: 'Premium Five', hasPremium: true, premiumDays: 30 },
      { username: 'premium6', email: 'premium6@example.com', password: 'password123', fullName: 'Premium Six', hasPremium: true, premiumDays: 30 },
      { username: 'premium7', email: 'premium7@example.com', password: 'password123', fullName: 'Premium Seven', hasPremium: true, premiumDays: 30 },
      { username: 'premium8', email: 'premium8@example.com', password: 'password123', fullName: 'Premium Eight', hasPremium: true, premiumDays: 30 },
      { username: 'premium9', email: 'premium9@example.com', password: 'password123', fullName: 'Premium Nine', hasPremium: true, premiumDays: 30 },
      { username: 'premium10', email: 'premium10@example.com', password: 'password123', fullName: 'Premium Ten', hasPremium: true, premiumDays: 30 },
      { username: 'premium11', email: 'premium11@example.com', password: 'password123', fullName: 'Premium Eleven', hasPremium: true, premiumDays: 30 },
      { username: 'premium12', email: 'premium12@example.com', password: 'password123', fullName: 'Premium Twelve', hasPremium: true, premiumDays: 30 },
    ];

    // ✅ Users yaratish
    for (const userData of usersData) {
      const hashedPassword = await bcrypt.hash(userData.password || 'password', 10);
      const userPayload: Partial<User> = {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        fullName: userData.fullName,
        hasPremium: userData.hasPremium,
        totalScore: Math.floor(Math.random() * 3000) + 500,
      };

      if (userData.hasPremium) {
        userPayload.premiumExpiresAt = new Date(
          Date.now() + userData.premiumDays * 24 * 60 * 60 * 1000
        );
      }

      const user = userRepository.create(userPayload);
      const savedUser = await userRepository.save(user);
      createdUsers.push(savedUser);
      console.log(`✅ User yaratildi: ${userData.username}`);
    }

    // ✅ Test va savollar yaratish
    let existingTests: any[] = await testRepository.find();
    if (existingTests.length === 0) {
      const testsData = [
        {
          title: 'IELTS Reading Practice',
          description: 'Practice test for IELTS Reading section',
          category: TestCategory.IELTS,
          type: TestType.ENGLISH,
          difficultyLevel: DifficultyLevel.MEDIUM,
          duration: 60,
          totalQuestions: 40,
          passingScorePercentage: 70,
          status: TestStatus.PUBLISHED,
        },
        {
          title: 'Math Algebra Basics',
          description: 'Basic algebra practice test',
          category: TestCategory.GENERAL_ENGLISH,
          type: TestType.MATH,
          difficultyLevel: DifficultyLevel.EASY,
          duration: 45,
          totalQuestions: 35,
          passingScorePercentage: 60,
          status: TestStatus.PUBLISHED,
        },
        {
          title: 'Advanced English Grammar',
          description: 'Advanced grammar test',
          category: TestCategory.GRAMMAR,
          type: TestType.ENGLISH,
          difficultyLevel: DifficultyLevel.HARD,
          duration: 75,
          totalQuestions: 50,
          passingScorePercentage: 75,
          status: TestStatus.PUBLISHED,
        },
      ];

      for (const testData of testsData) {
        const test = testRepository.create(testData as any);
        const savedTest: any = await testRepository.save(test);
        existingTests.push(savedTest);

        // Savollar yaratish
        for (let i = 1; i <= testData.totalQuestions; i++) {
          const question = questionRepository.create({
            questionText: `${testData.title} - Question ${i}`,
            correctAnswer: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
            options: ['A', 'B', 'C', 'D'],
            points: 1,
            test: savedTest,
          } as any);
          await questionRepository.save(question);
        }

        console.log(`✅ Test yaratildi: ${testData.title}`);
      }
    }

    // ✅ 30 kunlik sikl: test natijalarini yaratish
    const days = Array.from({ length: 30 }, (_, i) => i);
    for (let day of days) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomTest = existingTests[Math.floor(Math.random() * existingTests.length)];
      const score = Math.floor(Math.random() * 80) + 20;
      const scorePercentage = score;

      const completedAt = new Date();
      completedAt.setDate(completedAt.getDate() - day);

      const testResult = testResultRepository.create({
        score,
        scorePercentage,
        isPassed: scorePercentage >= 70,
        timeTaken: Math.floor(Math.random() * 3000) + 600,
        completedAt,
        user: randomUser,
        test: randomTest,
      });

      await testResultRepository.save(testResult);
    }

    // ✅ Random qolgan test natijalari
    for (const user of createdUsers) {
      const resultCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < resultCount; i++) {
        const randomTest = existingTests[Math.floor(Math.random() * existingTests.length)];
        const score = Math.floor(Math.random() * 80) + 20;
        const scorePercentage = score;
        const completedAt = new Date();
        const randomDay = Math.floor(Math.random() * 30);
        completedAt.setDate(completedAt.getDate() - randomDay);

        const testResult = testResultRepository.create({
          score,
          scorePercentage,
          isPassed: scorePercentage >= 70,
          timeTaken: Math.floor(Math.random() * 3000) + 600,
          completedAt,
          user,
          test: randomTest,
        });

        await testResultRepository.save(testResult);
      }
    }

    // ✅ Leaderboard ma'lumotlarini yaratish
    for (const user of createdUsers) {
      const latestResult = await testResultRepository.findOne({
        where: { user: { id: user.id } },
        order: { completedAt: 'DESC' },
        relations: ['test'],
      });

      leaderboardData.push({
        userID: user.id,
        studentName: user.fullName || user.username,
        email: user.email,
        testType: latestResult?.test?.title || 'N/A',
        bandScore: latestResult?.score || 0,
        date: latestResult?.completedAt || null,
      });
    }

    // TotalScore bo'yicha sortlash va rank berish
    leaderboardData.sort((a, b) => b.bandScore - a.bandScore);
    leaderboardData.forEach((item, index) => {
      item.rank = index + 1;
    });

    console.log('✅ Leaderboard ma\'lumotlari tayyor:');
    console.table(leaderboardData);

    console.log('\n🎉 Seeding muvaffaqiyatli yakunlandi!');
    await AppDataSource.destroy();
    process.exit(0);

  } catch (error) {
    console.error('❌ Seeding xatosi:', error);
    await AppDataSource.destroy();
    process.exit(1);
  }
};

seedUsers();