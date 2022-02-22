/* eslint-disable prettier/prettier */
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // binds ValidationPipe to the entire application
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // 👈 automatically transform payloads
  }));
  
  // apply transform to all responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // 👇 apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
  const { httpAdapter } = app.get(HttpAdapterHost);
  
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  
  // Swagger config
  const config = new DocumentBuilder()
  .setTitle('NestJS Prisma Workshop')
  .setDescription('API description')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
await app.listen(3030);
}
bootstrap();
