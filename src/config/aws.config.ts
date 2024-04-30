import { registerAs } from '@nestjs/config';
import { AwsConfig } from './config.type';
import { IsString } from 'class-validator';
import validateConfig from '../utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  BUCKET_NAME: string;
}

export default registerAs<AwsConfig>('aws', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    bucketName: process.env.BUCKET_NAME || '',
  };
});
