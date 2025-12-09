import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './config/database.config';
import { JwtModule } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Test } from './entities/test.entity';
import { TestResult } from './entities/test-result.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        try {
          console.log('⏳ Connecting to PostgreSQL...');

          return {
            type: 'postgres',
            url: appConfig.dbUrl,
            synchronize: true,
            entities: ['dist/core/entity/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            ssl:
              appConfig.NODE_ENV === 'production'
                ? { rejectUnauthorized: false }
                : false,
          };
        } catch (err) {
          console.error('❌ PostgreSQL connection failed:', err.message);
          process.exit(1);
        }
      },
    }),
    JwtModule.register({ global: true }),
    TypeOrmModule.forFeature([User, Test, TestResult]),
    AnalyticsModule,
    LeaderboardModule,
    UserModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
