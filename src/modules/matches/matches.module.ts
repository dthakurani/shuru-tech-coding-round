import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../teams/entities/team.entity';
import { Match } from './entities/match.entity';
import { TeamPlayerMapping } from '../teams/entities/team-player-mapping.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Match, TeamPlayerMapping])],
  controllers: [MatchesController],
  providers: [MatchesService],
})
export class MatchesModule {}
