import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';
import { FileService } from 'config/multer.service';

@Module({
  controllers: [SupportController],
  providers: [SupportService, FileService],
})
export class SupportModule {}
