import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ always: true, message: '分类名称类型不正确' })
  @IsNotEmpty({ message: '分类名称不能为空' })
  name: string;
}
