import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderConstraint } from '../constraints/order.constraint';
import { IsEnum, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: OrderConstraint, default: OrderConstraint.ASC })
  @IsEnum(OrderConstraint)
  @IsOptional()
  readonly order?: OrderConstraint = OrderConstraint.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    default: 10,
    maximum: 50,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
