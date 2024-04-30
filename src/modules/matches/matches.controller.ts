import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Req,
  Res,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Request, Response } from 'express';
import { CommonHelper } from '../common/common.helper';
import { CreatePlayerDto } from '../players/dto/create-player.dto';
import { FindAllMatchDto } from './dto/find-all-match.entity';

@Controller('matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly commonHelper: CommonHelper,
  ) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateMatchDto,
  ) {
    try {
      await this.matchesService.create(body);

      this.commonHelper.apiResponseHandler({
        res,
        data: {},
        message: 'Match creates successfully!',
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      console.log('Error in Match create', new Date().toISOString(), error);

      this.commonHelper.apiErrorHandler({
        req,
        res,
        error,
      });
    }
  }

  @Get()
  async FindAll(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: FindAllMatchDto,
  ) {
    try {
      const data = await this.matchesService.findAll(query);

      this.commonHelper.apiResponseHandler({
        res,
        data,
        status: HttpStatus.OK,
      });
    } catch (error) {
      console.log('Error in Match findAll', new Date().toISOString(), error);

      this.commonHelper.apiErrorHandler({
        req,
        res,
        error,
      });
    }
  }

  @Get(':id')
  async FindOne(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    try {
      const data = await this.matchesService.findOne(id);

      this.commonHelper.apiResponseHandler({
        res,
        data,
        status: HttpStatus.OK,
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

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateMatchDto,
  ) {
    try {
      await this.matchesService.update(id, body);

      this.commonHelper.apiResponseHandler({
        res,
        data: {},
        message: 'Record updated successfully',
        status: HttpStatus.OK,
      });
    } catch (error) {
      console.log('Error in Player update', new Date().toISOString(), error);

      this.commonHelper.apiErrorHandler({
        req,
        res,
        error,
      });
    }
  }
}
