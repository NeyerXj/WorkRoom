import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { SimpleJwtService } from 'src/auth/jwt/jwt.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: SimpleJwtService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const header = req.headers['authorization'];
    if (!header?.startsWith('Bearer ')) throw new UnauthorizedException();
    const token = header.slice(7);
    const payload = this.jwt.verify(token);
    req.user = { id: payload.sub, email: payload.email };
    return true;
  }
}