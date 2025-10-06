import PinoPretty from 'pino-pretty';

import {
    blueConsole,
    cyanConsole,
    magentaBrightConsole,
    yellowConsole,
} from './console-color.util';

export default (): PinoPretty.PrettyStream =>
    PinoPretty({
        colorize: !process.env.NO_COLOR,
        levelFirst: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss o',
        ignore: 'context',
        customPrettifiers: {
            hostname: (hostname: string | object) => blueConsole(hostname),
            pid: (pid: string | object) => blueConsole(pid),
            name: (name: string | object) => blueConsole(name),
            caller: (caller: string | object) => cyanConsole(caller),
        },
        messageFormat: (log: Record<string, any>, messageKey: string) => {
            const message = log[messageKey] as string;

            if (log.res) {
                const logContext = log.context ? yellowConsole(`[${log.context}]`) : '';
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const reqMethod = log.req.method;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                const statusCode = log.res?.statusCode;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                const reqUrl = yellowConsole(log.req.url);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const responseTime = magentaBrightConsole(log.responseTime);

                const methodAndStatus = magentaBrightConsole(`${reqMethod} ${statusCode}`);

                const preparedMessage = message ? ` ${message}` : '';

                return `${logContext} ${methodAndStatus} ${reqUrl} -${preparedMessage} by ${responseTime} ms`;
            }

            if (log.context) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                return `|${yellowConsole(log.context)}| ${message}`;
            }

            return `${message}`;
        },
    });
