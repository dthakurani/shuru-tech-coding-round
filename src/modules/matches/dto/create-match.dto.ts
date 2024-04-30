import { IsDateString, IsISO8601, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUUID()
  teamIdOne: string;

  @IsNotEmpty()
  @IsUUID()
  teamIdTwo: string;

  @IsNotEmpty()
  venue: string;

  @IsISO8601({ strict: true })
  date: Date;
}
