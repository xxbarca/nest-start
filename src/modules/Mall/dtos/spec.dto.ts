import { BaseDto } from '@/modules/Database/base';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorGroup } from '@/modules/Core/constants';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { DtoValidation } from '@/modules/Core/decorators';

class BaseSpecKeyDto extends BaseDto {
  @IsNotEmpty({
    message: '规格名不能为空',
    groups: [ValidatorGroup.CREATE],
  })
  @IsOptional({ groups: [ValidatorGroup.PAGE, ValidatorGroup.UPDATE] })
  name: string;

  @IsOptional()
  unit: string;
}

@DtoValidation({ groups: [ValidatorGroup.CREATE] })
export class CreateSpecKeyDto extends PickType(BaseSpecKeyDto, [
  'name',
  'unit',
] as const) {}

@DtoValidation({ groups: [ValidatorGroup.UPDATE] })
export class UpdateSpecKeyDto extends PartialType(BaseSpecKeyDto) {}
