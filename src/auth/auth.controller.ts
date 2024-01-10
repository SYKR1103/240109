import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RequestWithUserInterface } from '../interfaces/requestWithUser.interface';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() c: CreateUserDto) {
    return this.authService.createUser(c);
  }

  // @Post('/login')
  // async loginUser(@Body() l: LoginUserDto) {
  //   const user = await this.authService.loginUser(l);
  //   const token = await this.authService.generateAccessToken(user.id);
  //   return { user, token };
  // }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(@Req() req: RequestWithUserInterface) {
    const { user } = req;
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
  }
}
