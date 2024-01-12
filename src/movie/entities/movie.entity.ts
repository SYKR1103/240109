import { BaseEntity } from '../../../common/base.common';
import { Column, Entity } from 'typeorm';

@Entity()
export class Movie extends BaseEntity {
  @Column()
  public title: string;

  @Column()
  public overview: string;

  @Column()
  public release_date: string;

  @Column()
  public adult: boolean;

  @Column()
  public vote_average: string;
}
