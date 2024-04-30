import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamPlayerMapping } from './team-player-mapping.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', default: 'null' })
  deletedAt: Date;

  @OneToMany(
    () => TeamPlayerMapping,
    (teamPlayerMapping) => teamPlayerMapping.team,
  )
  teamPlayerMapping: TeamPlayerMapping[];
}
