import pino from 'pino';

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { LOGGER_MODULE_OPTIONS } from '../constants/logger-options-provider-token';
import { loggerPlugin } from '../fastify-plugins/logger-plugin';
import type { ILoggerOptions } from '../interfaces/logger-options.interface';

@Injectable()
export class LoggerConfigService implements OnModuleInit {
    constructor(
        @Inject(LOGGER_MODULE_OPTIONS)
        private loggerModuleOptions: ILoggerOptions,
        private adapterHost: HttpAdapterHost<FastifyAdapter>,
    ) {}

    async onModuleInit(): Promise<void> {
        const isFastifyAdapter = this.adapterHost.httpAdapter instanceof FastifyAdapter;

        if (!isFastifyAdapter) {
            throw new Error('LoggerModule supports only FastifyAdapter');
        }

        const pinoLogger = this.getPinoLogger();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await this.adapterHost.httpAdapter.register(loggerPlugin as any, {
            pinoLogger,
            ...this.loggerModuleOptions,
        });
    }

    private getPinoLogger(): pino.Logger {
        const pinoOptions = this.loggerModuleOptions.pinoOptions || {};

        if (this.loggerModuleOptions.stream) {
            return pino(pinoOptions, this.loggerModuleOptions.stream);
        }

        return pino(pinoOptions);
    }
}
