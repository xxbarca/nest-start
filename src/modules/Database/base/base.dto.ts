import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ValidatorGroup } from '@/modules/Core/constants';

export class BaseDto {
  @IsNotEmpty({
    message: '名称不能为空',
    groups: [ValidatorGroup.CREATE],
  })
  @IsOptional({ groups: [ValidatorGroup.PAGE, ValidatorGroup.UPDATE] })
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  index: number;

  @IsUUID(undefined, {
    message: 'id格式不正确',
    groups: [ValidatorGroup.UPDATE],
  })
  @IsNotEmpty({ message: 'id不能为空', groups: [ValidatorGroup.UPDATE] })
  id: string;
}
