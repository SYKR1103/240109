import { PageMegaInterface } from '../interfaces/page-mega.interface';
import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasprevious: boolean;

  @ApiProperty()
  readonly hasnext: boolean;

  constructor({ pageOptionDto, itemCount }: PageMegaInterface) {
    this.take = pageOptionDto.take;
    this.page = pageOptionDto.page;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasnext = this.pageCount > this.page;
    this.hasprevious = this.page > 1;
  }
}
