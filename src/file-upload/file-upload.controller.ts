import {
  Controller,
  Post,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { Express } from 'express';

@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!this.isValidFileType(file.mimetype)) {
      throw new UnsupportedMediaTypeException('Unsupported file type');
    }

    return this.fileUploadService.uploadFile(file);
  }

  @Delete(':fileId')
  async deleteFile(@Param('fileId') fileId: string) {
    return this.fileUploadService.deleteFile(fileId);
  }

  private isValidFileType(mimeType: string): boolean {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mkv|avi/;
    return allowedTypes.test(mimeType);
  }
}
