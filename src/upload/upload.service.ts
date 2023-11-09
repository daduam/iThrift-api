import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
        Key: fileName,
        Body: file,
      }),
    );

    const fileUrl = this.generateFileUrl(fileName);

    return { fileUrl };
  }

  generateFileUrl(fileName: string) {
    const awsCdnPrefix = this.configService.getOrThrow('AWS_S3_CDN_PREFIX');
    return `${awsCdnPrefix}/${fileName}`;
  }
}
