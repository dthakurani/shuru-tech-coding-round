import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('team_player_mapping')
export class TeamPlayerMapping {
  @PrimaryGeneratedColumn()
  id: number;

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
}
