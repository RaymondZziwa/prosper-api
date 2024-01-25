import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: any,
    done: (error: Error | null, user: any) => void,
  ): any {
    // user object to be stored in the session
    done(null, user);
  }

  deserializeUser(
    payload: any,
    done: (error: Error | null, payload: string) => void,
  ): any {
    done(null, payload);
  }
}
