import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Request, Response } from 'express';
import { CommonHelper } from '../common/common.helper';

@Controller('players')
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
    private readonly commonHelper: CommonHelper,
  ) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreatePlayerDto,
  ) {
    try {
      await this.playersService.create(body);

      this.commonHelper.apiResponseHandler({
        res,
        data: {},
        message: 'Player create successfully!',
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      console.log('Error in Player create', new Date().toISOString(), error);

      this.commonHelper.apiErrorHandler({
        req,
        res,
        error,
      });
    }
  }
}
