import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  playersId: string[];
}
