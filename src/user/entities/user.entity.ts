import { BaseEntity } from '../../../common/base.common';
import { Column, Entity } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class User extends BaseEntity {
  @Column()
  public nickname: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  async hashPassword() {
    try {
      const saltValue = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, saltValue);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string) {
    try {
      const isMatched = await bcrypt.compare(aPassword, this.password);
      return isMatched;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}