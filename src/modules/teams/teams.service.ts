import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CustomException } from 'src/utils/custom-exception';
import { TeamPlayerMapping } from './entities/team-player-mapping.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,

    @InjectRepository(TeamPlayerMapping)
    private teamPlayerMappingRepository: Repository<TeamPlayerMapping>,
  ) {}
  async create(body: CreateTeamDto) {
    const teamFound = await this.teamRepository.findOne({
      where: { name: ILike(body.name) },
    });

    if (teamFound) {
      throw new CustomException().throwHttpError({
        message: 'Team already exists with this name!',
        status: HttpStatus.CONFLICT,
        errorKey: 'name',
      });
    }

    const teamPlayersAlreadyAssigned =
      await this.teamPlayerMappingRepository.find({
        where: {
          playerId: In(body.players_id),
        },
      });

    if (teamPlayersAlreadyAssigned.length > 0) {
      throw new CustomException().throwHttpError({
        message: 'Team player(s) are already assigned to another team!',
        status: HttpStatus.BAD_REQUEST,
        errorKey: 'players_id',
      });
    }

    const team = await this.teamRepository.save({ name: body.name });

    const teamPlayerMapping = body.players_id.map((playerId) => ({
      teamId: team.id.toString(),
      playerId,
    }));

    await this.teamPlayerMappingRepository.insert(teamPlayerMapping);
  }
}
