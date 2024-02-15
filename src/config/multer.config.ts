import { Request } from 'express';
import * as path from 'path';

interface MulterOptions {
  destination: string;
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => void;
}

export const multerOptions = (destination: string): MulterOptions => {
  return {
    destination,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = path.extname(file.originalname).toLowerCase();
      cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
  };
};
