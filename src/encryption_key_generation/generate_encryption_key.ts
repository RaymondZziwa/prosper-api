import { randomBytes } from 'crypto';

let generatedEncryptionKey: { key: string; timeStamp: number };

export function setGeneratedEncryptionKey(encryptionKey: {
  key: string;
  timeStamp: number;
}) {
  generatedEncryptionKey = encryptionKey;
}

export function getGeneratedEncryptionKey(): {
  key: string;
  timeStamp: number;
} {
  if (!generatedEncryptionKey) {
    throw new Error(
      'Encryption key not set. Make sure to set it before retrieving.',
    );
  }
  return generatedEncryptionKey;
}

export function generatePasswordResetEncryptionKey(length: number = 6): {
  key: string;
  timeStamp: number;
} {
  const characters: string =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const randomBytesBuffer: Buffer = randomBytes(length);
  let encryptionKey: string = '';

  for (let i = 0; i < randomBytesBuffer.length; i++) {
    const randomIndex: number =
      randomBytesBuffer.readUInt8(i) % characters.length;
    encryptionKey += characters.charAt(randomIndex);
  }

  // Generate a timestamp for the current time
  const timestamp: number = Date.now();

  setGeneratedEncryptionKey({ key: encryptionKey, timeStamp: timestamp });

  return { key: encryptionKey, timeStamp: timestamp };
}

export function isEncryptionKeyExpired(originalTimestamp: number): boolean {
  const keyExpirationTime: number = 15 * 60 * 1000; // 15 minutes in milliseconds
  const currentTime: number = Date.now();

  return currentTime - originalTimestamp > keyExpirationTime;
}
