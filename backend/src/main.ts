import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe());
  
 const config = new DocumentBuilder()
    .setTitle('Admin Panel API')
    .setDescription('Admin paneli uchun API dokumentatsiyasi')
    .setVersion('1.0.0')
    .addTag('Analytics', 'Platform analitikasi')
    .addTag('Users', 'Foydalanuvchi boshqaruvi')
    .addTag('Tests', 'Test boshqaruvi')
    .addTag('Leaderboard', 'Top o\'yinchilar reytingi')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log('Swagger docs available at http://localhost:3000/api-docs');
}
bootstrap();
