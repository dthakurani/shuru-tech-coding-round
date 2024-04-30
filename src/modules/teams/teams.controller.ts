import { Controller, Post, Body, HttpStatus, Req, Res } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CommonHelper } from '../common/common.helper';
import { CreateTeamDto } from './dto/create-team.dto';
import { Request, Response } from 'express';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly commonHelper: CommonHelper,
  ) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateTeamDto,
  ) {
    try {
      await this.teamsService.create(body);

      this.commonHelper.apiResponseHandler({
        res,
        data: {},
        message: 'Team created successfully!',
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      console.log('Error in Team create', new Date().toISOString(), error);

      this.commonHelper.apiErrorHandler({
        req,
        res,
        error,
      });
    }
  }
}
