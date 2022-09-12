import { User } from 'src/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Match } from './match.entity';

@Entity()
export class Prediction {
  @Column()
  homeScore: number;

  @Column()
  awayScore: number;

  @Column()
  winnerCode: number;

  @Column({ nullable: true })
  pointsEarned: number;

  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => User, (user) => user.predictions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @PrimaryColumn()
  match_id: string;

  @ManyToOne(() => Match, (match) => match.predictions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'match_id',
    referencedColumnName: 'id',
  })
  match: Match;
}
