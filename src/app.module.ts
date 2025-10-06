import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import loggerConfig from './config/logger.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrgsModule } from './orgs/orgs.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { validate } from './config/env.validation';
import { MembershipModule } from './membership/membership.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, loggerConfig],
      validate,
    }),

    LoggerModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (cfg: ConfigService) => {
    const pretty = cfg.get<boolean>('logger.pretty') ?? true;

    return {
      pinoOptions: {
        level: process.env.LOG_LEVEL || 'info',
        transport: pretty
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
      },
    };
  },
}),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (/* ConfigService */) => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true, // миграции
        logging: true,
      }),
    }),

    AuthModule,
    UsersModule,
    OrgsModule,
    ProjectsModule,
    TasksModule,
    MembershipModule,
  ],
})
export class AppModule {}
