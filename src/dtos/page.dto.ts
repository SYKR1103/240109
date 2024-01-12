import { PageMetaDto } from './page-meta.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PageDto<T> {
  @ApiPropertyOptional({ isArray: true })
  readonly data: T[];

  @ApiPropertyOptional({ type: () => PageMetaDto })
  readonly meta: any;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
