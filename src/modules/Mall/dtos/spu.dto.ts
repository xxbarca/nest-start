import { BaseDto } from '@/modules/Database/base';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { ValidatorGroup } from '@/modules/Core/constants';
import { OnlineStatus } from '@/modules/Mall/constants';
import { DtoValidation } from '@/modules/Core/decorators';
import { PartialType } from '@nestjs/mapped-types';
import { PaginateOptions } from '@/modules/Database/types';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';

class BaseSpuDto extends BaseDto {
  @IsUUID(undefined, {
    groups: [ValidatorGroup.CREATE, ValidatorGroup.UPDATE],
    message: '分类id格式不正确',
  })
  @IsNotEmpty({
    groups: [ValidatorGroup.UPDATE, ValidatorGroup.CREATE],
    message: '分类不能为空',
  })
  category: string;

  @IsOptional({ groups: [ValidatorGroup.CREATE, ValidatorGroup.UPDATE] })
  img: string;

  @IsOptional({ groups: [ValidatorGroup.UPDATE, ValidatorGroup.CREATE] })
  tags: string;

  @IsOptional({ groups: [ValidatorGroup.UPDATE, ValidatorGroup.CREATE] })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  discount_price: number;

  @IsEnum(OnlineStatus)
  online: OnlineStatus;
}

@DtoValidation({ groups: [ValidatorGroup.CREATE] })
export class CreateSpuDto extends BaseSpuDto {}

@DtoValidation({ groups: [ValidatorGroup.UPDATE] })
export class UpdateSpuDto extends PartialType(BaseSpuDto) {}

@DtoValidation({ groups: [ValidatorGroup.PAGE] })
export class PageSpuDto
  extends PartialType(BaseSpuDto)
  implements PaginateOptions
{
  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '当前页必须大于1' })
  @IsNotEmpty({ always: true })
  pageNo: number = 1;

  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '每页显示数据必须大于10' })
  @IsNotEmpty({ always: true })
  pageSize: number = 10;
}
