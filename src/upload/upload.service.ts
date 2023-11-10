import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer) {
    const command = new PutObjectCommand({
      Bucket: this.configService.getOrThrow('AWS_S3_BUCKET'),
      Key: fileName,
      Body: file,
    });

    const fileUrl = await getSignedUrl(this.s3Client, command);

    return { fileUrl };
  }
}
