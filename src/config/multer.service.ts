import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async saveFile(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<string> {
    const filePath = path.join(
      __dirname,
      '..',
      'uploads',
      folderName,
      file.filename,
    );
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(filePath);
        }
      });
    });
  }
}
