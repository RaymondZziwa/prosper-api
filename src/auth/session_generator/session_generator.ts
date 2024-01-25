import * as crypto from 'crypto';

export function SessionKeyGenerator(): string {
  try {
    const generatedSessionKey = crypto.randomBytes(32).toString('hex');

    return generatedSessionKey;
  } catch (error) {
    console.log('Error while generating session key:', error);
    return 'defaultsecret';
  }
}
