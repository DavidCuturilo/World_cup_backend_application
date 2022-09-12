import { Column, Entity, Generated, OneToMany, PrimaryColumn } from 'typeorm';
import { Prediction } from './prediction.entity';

@Entity()
export class User {
  @Column({
    unique: true,
  })
  @Generated('increment')
  id: number;

  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ nullable: true, default: 0 })
  points: number;

  @OneToMany(() => Prediction, (prediction) => prediction.user, {
    cascade: ['update', 'insert', 'remove'],
  })
  predictions!: Prediction[];
}
