import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CustomException } from 'src/utils/custom-exception';
import { Team } from '../teams/entities/team.entity';
import { FindAllMatchDto } from './dto/find-all-match.entity';
import { TeamPlayerMapping } from '../teams/entities/team-player-mapping.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,

    @InjectRepository(Team)
    private teamRepository: Repository<Team>,

    @InjectRepository(TeamPlayerMapping)
    private teamPlayerMappingRepository: Repository<TeamPlayerMapping>,
  ) {}

  async create(body: CreateMatchDto) {
    const matchDate = new Date(new Date(body.date).setHours(0, 0, 0, 0));
    const currentDate = new Date(new Date().setHours(0, 0, 0, 0));

    if (currentDate >= matchDate) {
      throw new CustomException().throwHttpError({
        message: 'Can not create past match!',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const [matchTeams, matchFound] = await Promise.all([
      await this.teamRepository.find({
        where: { id: In([body.teamIdOne, body.teamIdTwo]) },
      }),

      await this.matchRepository.findOne({
        where: {
          teamIdOne: body.teamIdOne,
          teamIdTwo: body.teamIdTwo,
          date: matchDate,
        },
      }),
    ]);

    if (matchFound) {
      throw new CustomException().throwHttpError({
        message: 'Match already exists!',
        status: HttpStatus.CONFLICT,
      });
    }

    if (matchTeams.length !== 2) {
      throw new CustomException().throwHttpError({
        message: 'Team(s) not found!',
        status: HttpStatus.NOT_FOUND,
      });
    }

    await this.matchRepository.save({ ...body, date: matchDate });
  }

  async findAll(query: FindAllMatchDto) {
    let whereQuery = {};
    if (query.matchDate) {
      const matchDate = new Date(
        new Date(query.matchDate).setHours(0, 0, 0, 0),
      );
      whereQuery = {
        date: matchDate,
      };
    }

    const matches = await this.matchRepository.find({
      where: whereQuery,
      select: ['id', 'name', 'date', 'venue'],
    });

    return matches;
  }

  async findOne(id: string) {
    const matchFound = await this.matchRepository.findOne({
      where: { id },
      relations: [
        'teamOne.teamPlayerMapping.player',
        'teamTwo.teamPlayerMapping.player',
        'playerOfTheMatch',
        'winningTeam',
      ],
    });

    if (!matchFound) {
      throw new CustomException().throwHttpError({
        message: 'Match not found!',
        status: HttpStatus.NOT_FOUND,
      });
    }

    return matchFound;
  }

  async update(id: string, body: UpdateMatchDto) {
    const currentDate = new Date(new Date().setHours(0, 0, 0, 0));

    const matchFound = await this.matchRepository.findOne({
      where: { id },
      select: ['id', 'teamIdOne', 'teamIdTwo', 'date'],
    });

    if (!matchFound) {
      throw new CustomException().throwHttpError({
        message: 'Match not found!',
        status: HttpStatus.NOT_FOUND,
      });
    }

    const matchDate = new Date(new Date(matchFound.date).setHours(0, 0, 0, 0));

    if (currentDate < matchDate) {
      throw new CustomException().throwHttpError({
        message: 'Can not update future match!',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    if (
      body.winningTeamId !== matchFound.teamIdOne &&
      body.winningTeamId !== matchFound.teamIdTwo
    ) {
      throw new CustomException().throwHttpError({
        message: 'Team not found!',
        status: HttpStatus.NOT_FOUND,
      });
    }

    const teamPlayer = await this.teamPlayerMappingRepository.findOne({
      where: [
        {
          playerId: body.playerOfTheMatchId,
          teamId: matchFound.teamIdOne,
        },
        {
          playerId: body.playerOfTheMatchId,
          teamId: matchFound.teamIdTwo,
        },
      ],
    });

    if (!teamPlayer) {
      throw new CustomException().throwHttpError({
        message: 'Player not belongs to any of the team!',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    await this.matchRepository.update({ id }, { ...body });
  }
}
