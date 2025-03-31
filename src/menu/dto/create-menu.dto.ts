import { IsNotEmpty, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class CreateMenuDto {
  @IsNotEmpty()
  menuName: string;

  @IsNotEmpty()
  menuPath: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
