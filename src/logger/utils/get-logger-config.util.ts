import { FastifyReply, FastifyRequest } from 'fastify';
import pino, { LevelWithSilent } from 'pino';

import { ILoggerOptions, LogFormat } from '../interfaces/logger-options.interface';
import { ISerializedRequest } from '../interfaces/serialized-request.interface';
import pinoPrettyTransport from './pino-pretty-transport';

export function prepareLoggerConfig(config: Partial<ILoggerOptions>): ILoggerOptions {
    return {
        pinoOptions: {
            level: config?.pinoOptions?.level || 'debug',
        },
        stream:
            config.logFormat === LogFormat.PRETTY
                ? pinoPrettyTransport()
                : pino.destination({ sync: false }),
        customLogLevel: function (_req, res): LevelWithSilent {
            const { statusCode } = res;

            if (statusCode >= 400 && statusCode < 500) {
                return 'warn';
            }

            if (statusCode >= 500) {
                return 'error';
            }

            return 'info';
        },
        reqResSerializers: {
            req: (req) => serializeReq(req),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            res: (reply) => serializeRes(reply),
        },
    };
}

function serializeReq(req: FastifyRequest): ISerializedRequest {
    return {
        id: req.id,
        method: req.method,
        url: req.url,
        query: req.query,
        userAgent: req.headers['user-agent'] ?? req.headers['User-Agent'],
    };
}

function serializeRes(res: FastifyReply): any {
    return {
        statusCode: res.statusCode,
    };
}
