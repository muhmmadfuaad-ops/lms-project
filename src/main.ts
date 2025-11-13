import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  // --- Swagger Configuration ---
  const config = new DocumentBuilder()
    .setTitle('LMS Project API')            // Title of your docs
    .setDescription('API documentation for the LMS backend')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token (without "Bearer" prefix)',
        in: 'header',
      },
      'access-token', // this name will be used later in decorators
    )
    .addTag('users')                        // Optional grouping tag
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // URL => http://localhost:3000/api

  await app.listen(3000);
  console.log('🚀 App running on http://localhost:3000');
  console.log('📘 Swagger Docs on http://localhost:3000/api');
}

bootstrap();
