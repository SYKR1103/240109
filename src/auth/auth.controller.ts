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
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RequestWithUserInterface } from '../interfaces/requestWithUser.interface';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { GoogleAuthGuard } from '../guards/google-auth.guard';

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

  @Post('/email/send')
  async emailSender(@Body('email') email: string) {
    return this.authService.emailSender(email);
  }

  @Post('/email/check')
  async emailCheck(@Body('email') email: string, @Body('code') code: string) {
    return this.authService.emailChecker(email, code);
  }
  @UseGuards(GoogleAuthGuard)
  @Get('/google')
  async googleLogin() {
    return HttpStatus.OK;
  }
  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  async googleCallback(@Req() req: RequestWithUserInterface) {
    const { user } = req;
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
  }
}
