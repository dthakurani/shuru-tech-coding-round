import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from './team.entity';
import { Player } from 'src/modules/players/entities/player.entity';

@Entity('team_player_mapping')
export class TeamPlayerMapping {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'team_id', type: 'uuid', nullable: false })
  teamId: string;

  @Column({ name: 'player_id', type: 'uuid', nullable: false })
  playerId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', default: 'null' })
  deletedAt: Date;

  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @OneToOne(() => Player, (player) => player.id)
  @JoinColumn({ name: 'player_id' })
  player: Player;
}
