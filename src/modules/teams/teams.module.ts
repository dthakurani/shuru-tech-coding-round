import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamPlayerMapping } from './entities/team-player-mapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TeamPlayerMapping])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
