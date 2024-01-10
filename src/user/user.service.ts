import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createU(c: CreateUserDto) {
    const newUser = await this.userRepo.create(c);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async findUserById(id: string) {
    const founduser = await this.userRepo.findOneBy({ id });
    if (!founduser) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return founduser;
  }

  async findUserByEmail(email: string) {
    const founduser = await this.userRepo.findOneBy({ email });
    if (!founduser) throw new HttpException('not found', HttpStatus.NOT_FOUND);
    return founduser;
  }
}
