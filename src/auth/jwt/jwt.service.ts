import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'node:crypto';

interface Payload { sub: string; email: string; iat: number; exp: number; }

@Injectable()
export class SimpleJwtService {
  private readonly secret = process.env.JWT_SECRET!;
  private readonly ttlSec = parseInt(process.env.JWT_TTL_SEC ?? '3600', 10);

  sign(payload: Omit<Payload, 'iat'|'exp'>): string {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + this.ttlSec;
    const full: Payload = { ...payload, iat, exp };
    const body = Buffer.from(JSON.stringify(full)).toString('base64url');
    const sig = createHmac('sha256', this.secret).update(body).digest('base64url');
    return `${body}.${sig}`;
  }

  verify(token: string): Payload {
    const [body, sig] = token.split('.');
    const expected = createHmac('sha256', this.secret).update(body).digest('base64url');
    if (expected !== sig) throw new UnauthorizedException('Invalid token sig');
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString()) as Payload;
    if (payload.exp < Math.floor(Date.now() / 1000)) throw new UnauthorizedException('Token expired');
    return payload;
  }
}