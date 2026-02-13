import { BaseDto } from '@/modules/Database/base';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { ValidatorGroup } from '@/modules/Core/constants';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { DtoValidation } from '@/modules/Core/decorators';
import { SkuEntity } from '@/modules/Mall/entities';

class BaseSkuDto extends BaseDto {
  @IsNotEmpty({
    groups: [ValidatorGroup.CREATE, ValidatorGroup.UPDATE],
    message: `库存不能为空`,
  })
  stock: number;

  @IsUUID(undefined, {
    groups: [ValidatorGroup.CREATE, ValidatorGroup.UPDATE],
    message: 'SPU id格式不正确',
  })
  @ValidateIf((o: SkuEntity) => !!o.spu, { groups: [ValidatorGroup.UPDATE] })
  @IsNotEmpty({
    groups: [ValidatorGroup.CREATE],
    message: 'SPU不能为空',
  })
  spu: string;

  @IsNumber()
  @IsOptional({ groups: [ValidatorGroup.CREATE, ValidatorGroup.UPDATE] })
  @IsNotEmpty({ groups: [ValidatorGroup.CREATE] })
  discount_price: number;

  @IsNumber()
  @IsOptional({ groups: [ValidatorGroup.CREATE, ValidatorGroup.UPDATE] })
  @IsNotEmpty({ groups: [ValidatorGroup.CREATE], message: '价格不能为空' })
  price: number;
}

@DtoValidation({ groups: [ValidatorGroup.CREATE] })
export class CreateSkuDto extends PickType(BaseSkuDto, [
  'price',
  'stock',
  'discount_price',
  'spu',
  'name',
  'description',
]) {}

@DtoValidation({ groups: [ValidatorGroup.UPDATE] })
export class UpdateSkuDto extends PartialType(BaseSkuDto) {}
