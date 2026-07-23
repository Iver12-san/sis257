import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAutoreDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El nombre no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty()
  readonly nombre: string;
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El apellido no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty()
  readonly apellido: string;
  @IsNotEmpty({ message: 'La nacionalidad es obligatorio' })
  @IsString({ message: 'La nacionalida debe ser una cadena de texto' })
  @MaxLength(20, { message: 'La nacionalidad no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty()
  readonly nacionalidad: string;
}
