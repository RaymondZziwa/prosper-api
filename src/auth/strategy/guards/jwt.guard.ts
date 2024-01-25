import { AuthGuard } from '@nestjs/passport';

export class JWTGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
