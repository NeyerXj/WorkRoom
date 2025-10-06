import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  pretty: (process.env.LOG_PRETTY ?? 'true') === 'true',
}));