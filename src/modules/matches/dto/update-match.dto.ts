import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateMatchDto {
  @IsNotEmpty()
  @IsUUID()
  playerOfTheMatchId: string;

  @IsNotEmpty()
  @IsUUID()
  winningTeamId: string;
}
