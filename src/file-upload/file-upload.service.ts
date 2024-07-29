import { EnvVariable } from '@app/enum/env-variable.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadClient } from '@uploadcare/upload-client';
import axios from 'axios';
import { Express } from 'express';

@Injectable()
export class FileUploadService {
  private readonly uploadClient: UploadClient;
  private readonly publicKey: string;
  private readonly secretKey: string;

  constructor(private configService: ConfigService) {
    this.publicKey = this.configService.get<string>(
      EnvVariable.UploadcarePublicKey,
    );
    this.secretKey = this.configService.get<string>(
      EnvVariable.UploadcareSecretKey,
    );

    this.uploadClient = new UploadClient({
      publicKey: this.publicKey,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    const maxFileSize = file.mimetype.startsWith('video')
      ? 20 * 1024 * 1024
      : 10 * 1024 * 1024;
    if (file.size > maxFileSize) {
      throw new HttpException(
        `File size should be less than ${maxFileSize / (1024 * 1024)} MB`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const response = await this.uploadClient.uploadFile(file.buffer, {
        contentType: file.mimetype,
        fileName: file.originalname,
      });
      return {
        fileId: response.uuid,
        cdnUrl: response.cdnUrl,
        originalFilename: response.originalFilename,
      };
    } catch (error) {
      throw new HttpException(
        'An error occurred while uploading the file',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteFile(fileId: string): Promise<any> {
    const url = `https://api.uploadcare.com/files/${fileId}/`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Uploadcare.Simple ${this.publicKey}:${this.secretKey}`,
    };

    try {
      const response = await axios.delete(url, { headers });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'An error occurred while deleting the file',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
