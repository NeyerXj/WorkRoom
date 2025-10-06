import { registerAs } from '@nestjs/config';

import { ILoggerOptions, LogFormat } from '../logger/interfaces/logger-options.interface';

export default registerAs(
    'logger',
    (): Partial<ILoggerOptions> => ({
        pinoOptions: {
            level:
                process.env.NODE_ENV === 'production'
                    ? 'info'
                    : process.env.NODE_ENV === 'development'
                      ? 'debug'
                      : 'silent',
        },

        logFormat: process.env.NODE_ENV === 'production' ? LogFormat.JSON : LogFormat.PRETTY,
    }),
);