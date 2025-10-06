import { Injectable } from '@nestjs/common';
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';

@Injectable()
export class PasswordHasher {
  private readonly keylen = 64;
  private readonly saltLen = 16;

  hash(password: string): string {
    const salt = randomBytes(this.saltLen);
    const derived = scryptSync(password, salt, this.keylen);
    return `${salt.toString('hex')}:${derived.toString('hex')}`;
  }

  verify(password: string, stored: string): boolean {
    const [saltHex, hashHex] = stored.split(':');
    const salt = Buffer.from(saltHex, 'hex');
    const hash = Buffer.from(hashHex, 'hex');
    const test = scryptSync(password, salt, hash.length);
    return timingSafeEqual(hash, test);
  }
}