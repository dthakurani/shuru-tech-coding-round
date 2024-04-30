import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Health Check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiOperation({ summary: 'Get health of the microservice' })
  getHealth(): Promise<string> {
    return this.appService.getHealth();
  }
}
