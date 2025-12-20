import { BaseDto } from '@/modules/Database/base';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ValidatorGroup } from '@/modules/Core/constants';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { DtoValidation } from '@/modules/Core/decorators';

class BaseSpecKeyDto extends BaseDto {
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

class BaseSpecValueDto extends BaseDto {
  @IsUUID(undefined, {
    groups: [ValidatorGroup.CREATE, ValidatorGroup.UPDATE],
    message: '规格名id格式不正确',
  })
  @IsNotEmpty({
    groups: [ValidatorGroup.UPDATE, ValidatorGroup.CREATE],
    message: '规格名不能为空',
  })
  key: string;
}

@DtoValidation({ groups: [ValidatorGroup.CREATE] })
export class CreateSpecValueDto extends PickType(BaseSpecValueDto, [
  'name',
  'key',
] as const) {}
