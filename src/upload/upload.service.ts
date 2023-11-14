import * as Bytescale from '@bytescale/sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodeFetch from 'node-fetch';

@Injectable()
export class UploadService {
  private readonly uploadManager = new Bytescale.UploadManager({
    apiKey: this.configService.getOrThrow('BYTESCALE_API_KEY'),
    fetchApi: nodeFetch as any,
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    const { fileUrl } = await this.uploadManager.upload({
      data: file,
      originalFileName: fileName,
    });
    return { fileUrl };
  }
}
