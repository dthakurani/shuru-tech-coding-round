import { Player } from 'src/modules/players/entities/player.entity';
import { Team } from 'src/modules/teams/entities/team.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'team_id_one' })
  teamIdOne: string;

  @Column({ name: 'team_id_two' })
  teamIdTwo: string;

  @Column({ name: 'venue' })
  venue: string;

  @Column({ name: 'date' })
  date: Date;

  @Column({ name: 'player_of_the_match_id' })
  playerOfTheMatchId: string;

  @Column({ name: 'winning_team_id' })
  winningTeamId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', default: 'null' })
  deletedAt: Date;

  // Relations
  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'team_id_one' })
  teamOne: Team;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'team_id_two' })
  teamTwo: Team;

  @ManyToOne(() => Player, (player) => player.id)
  @JoinColumn({ name: 'player_of_the_match_id' })
  playerOfTheMatch: Player;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'winning_team_id' })
  winningTeam: Team;
}
