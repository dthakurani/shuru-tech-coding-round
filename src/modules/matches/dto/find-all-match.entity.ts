import { IsISO8601, IsOptional } from 'class-validator';

export class FindAllMatchDto {
  @IsOptional()
  @IsISO8601({ strict: true })
  matchDate: Date;
}
