import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { ILike, Repository } from 'typeorm';
import { CommonHelper } from '../common/common.helper';
import { CustomException } from 'src/utils/custom-exception';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(body: CreatePlayerDto) {
    const playerFound = await this.playerRepository.findOne({
      where: {
        name: ILike(body.name),
      },
    });

    if (playerFound) {
      throw new CustomException().throwHttpError({
        message: 'Player already exists with this name!',
        status: HttpStatus.CONFLICT,
        errorKey: 'name',
      });
    }

    await this.playerRepository.save({ ...body });
  }
}
