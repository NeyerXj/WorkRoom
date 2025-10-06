import { DynamicModule, Global, Module } from '@nestjs/common';
import { ModuleMetadata, Provider } from '@nestjs/common/interfaces';

import { LOGGER_MODULE_OPTIONS } from './constants/logger-options-provider-token';
import { ILoggerOptions } from './interfaces/logger-options.interface';
import { prepareLoggerConfig } from './utils/get-logger-config.util';
import { PinoLogger } from './loggers/pino-logger.service';
import { getPinoLoggerProviders } from './utils/inject-pino-logger';
import { InternalPinoLogger } from './loggers/internal-pino-logger.service';
import { LoggerConfigService } from './services/logger-config.service';

export interface LoggerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useFactory: (...args: any[]) => Promise<Partial<ILoggerOptions>> | Partial<ILoggerOptions>;
}

@Global()
@Module({})
export class LoggerModule {
    static forRoot(options: ILoggerOptions): DynamicModule {
        const optionsWithDefault = prepareLoggerConfig(options);

        const paramsProvider: Provider<ILoggerOptions> = {
            provide: LOGGER_MODULE_OPTIONS,
            useValue: optionsWithDefault,
        };

        const decorated = getPinoLoggerProviders();

        return {
            module: LoggerModule,
            providers: [
                PinoLogger,
                ...decorated,
                InternalPinoLogger,
                paramsProvider,
                LoggerConfigService,
            ],
            exports: [PinoLogger, ...decorated, InternalPinoLogger, paramsProvider],
        };
    }

    static forRootAsync(asyncOpts: LoggerModuleAsyncOptions): DynamicModule {
        const asyncProvider: Provider<ILoggerOptions> = {
            provide: LOGGER_MODULE_OPTIONS,
            useFactory: async (...args: any[]) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const loggerConfig: Partial<ILoggerOptions> = await asyncOpts.useFactory(...args);
                return LoggerModule.mergeWithDefault(loggerConfig);
            },
            inject: asyncOpts.inject || [],
        };

        const providers = [
            asyncProvider,
            ...getPinoLoggerProviders(),
            PinoLogger,
            InternalPinoLogger,
            LoggerConfigService,
        ];

        return {
            module: LoggerModule,
            imports: asyncOpts.imports || [],
            providers,
            exports: providers,
        };
    }

    private static mergeWithDefault(config: Partial<ILoggerOptions>): ILoggerOptions {
        return prepareLoggerConfig(config);
    }
}
