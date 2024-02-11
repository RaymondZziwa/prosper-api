let encryptionKey: string;

export function setEncryptionKey(key: string) {
  encryptionKey = key;
}

export function getEncryptionKey(): string {
  return encryptionKey;
}
