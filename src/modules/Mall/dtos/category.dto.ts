import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { DtoValidation } from '@/modules/Core/decorators';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { ValidatorGroup } from '@/modules/Core/constants';
import { PaginateOptions } from '@/modules/Database/types';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';
import { BaseDto } from '@/modules/Database/base';

class BaseCategoryDto extends BaseDto {
  @IsNotEmpty({
    message: '分类名称不能为空',
    groups: [ValidatorGroup.CREATE],
  })
  @IsOptional({ groups: [ValidatorGroup.PAGE, ValidatorGroup.UPDATE] })
  name: string;

  @IsUUID()
  @IsOptional()
  parent: string;
}

@DtoValidation({ groups: [ValidatorGroup.CREATE] })
export class CreateCategoryDto extends PickType(BaseCategoryDto, [
  'name',
  'parent',
] as const) {}

@DtoValidation({ groups: [ValidatorGroup.UPDATE] })
export class UpdateCategoryDto extends PartialType(BaseCategoryDto) {}

@DtoValidation({ groups: [ValidatorGroup.PAGE] })
export class PaginateCategoryDto
  extends PartialType(BaseCategoryDto)
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
