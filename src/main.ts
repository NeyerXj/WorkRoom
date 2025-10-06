import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { PinoLogger } from './logger/loggers/pino-logger.service';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // ВАЖНО: передаём FastifyAdapter и отключаем стандартный логгер Nest
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
    { bufferLogs: true },
  );

  // Подключаем твой Pino-логгер
  const logger = app.get(PinoLogger);
  app.useLogger(logger);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Workroom API')
    .setDescription('API документация Workroom')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, {
    customSiteTitle: 'Workroom API Docs',
  });

  await app.listen({ port: Number(process.env.PORT) || 3000, host: '0.0.0.0' });
}
bootstrap();