import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Match } from './match.entity';

@Entity()
export class NationalTeam {
  @PrimaryColumn({ unique: true })
  name: string;

  @Column()
  group: string;

  @Column()
  standingsPosition: number;

  @Column()
  matchesPlayed: number;

  @Column()
  wins: number;

  @Column()
  draws: number;

  @Column()
  losses: number;

  @Column()
  points: number;

  @OneToMany(() => Match, (match) => match.homeTeam, {
    cascade: ['update', 'insert', 'remove'],
  })
  homeMatches!: Match[];

  @OneToMany(() => Match, (match) => match.awayTeam, {
    cascade: ['update', 'insert', 'remove'],
  })
  awayMatches!: Match[];
}
