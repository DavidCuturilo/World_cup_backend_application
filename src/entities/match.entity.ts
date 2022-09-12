import { Prediction } from './prediction.entity';
import { NationalTeam } from './national-team.entity';
import { MatchStatus } from 'src/enums/match-status.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Match {
  @PrimaryColumn()
  id: string;

  @Column()
  round: number;

  @Column({ type: 'enum', enum: MatchStatus })
  status: MatchStatus;

  @Column({ default: 0 })
  winnerCode: number;

  @ManyToOne(() => NationalTeam, (nationalTeam) => nationalTeam.homeMatches, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'home_team',
    referencedColumnName: 'name',
  })
  homeTeam: NationalTeam;

  @ManyToOne(() => NationalTeam, (nationalTeam) => nationalTeam.awayMatches, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'away_team',
    referencedColumnName: 'name',
  })
  awayTeam: NationalTeam;

  @Column({ default: 0 })
  homeScore: number;

  @Column({ default: 0 })
  awayScore: number;

  @OneToMany(() => Prediction, (prediction) => prediction.match, {
    cascade: ['update', 'insert', 'remove'],
  })
  predictions!: Prediction[];
}
