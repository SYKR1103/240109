import { ProviderEnum } from '../entities/provider.enum';

export class CreateUserDto {
  email: string;
  nickname: string;
  password?: string;
  provider?: ProviderEnum;
}
