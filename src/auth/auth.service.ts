import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { TokenPayloadInterface } from '../interfaces/tokenPayload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createUser(c: CreateUserDto) {
    return this.userService.createU(c);
  }

  async loginUser(l: LoginUserDto) {
    const user = await this.userService.findUserByEmail(l.email);
    const ispwMatched = await user.checkPassword(l.password);
    if (!ispwMatched)
      throw new HttpException('wrong pw', HttpStatus.BAD_REQUEST);
    return user;
  }

  public generateAccessToken(userId: string) {
    const payload: TokenPayloadInterface = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
    return token;
  }

  async emailSender(email: string) {
    const verification_code = this.generateOTP();
    await this.cacheManager.set(email, verification_code);
    await this.emailService.mailSender({
      to: email,
      subject: 'test',
      text: `verification code is ${verification_code}`,
    });
    return 'success';
  }

  async emailChecker(email: string, code: string) {
    const rcode = await this.cacheManager.get(email);
    if (rcode !== code)
      throw new HttpException('WRONG', HttpStatus.BAD_REQUEST);
    await this.cacheManager.del(email);
    return 'success';
  }

  generateOTP() {
    let OTP = '';
    for (let i = 1; i <= 6; i++) {
      OTP += Math.ceil(Math.random() * 10);
    }
    return OTP;
  }
}
