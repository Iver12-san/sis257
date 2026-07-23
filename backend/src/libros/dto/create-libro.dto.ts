import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateLibroDto {
  @IsNotEmpty({ message: 'El titulo  es obligatorio' })
  @IsString({ message: 'El titulo debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El titulo  no puede tener más de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty()
  readonly titulo: string;

  @IsNotEmpty({ message: 'La imagen  es obligatorio' })
  @IsString({ message: 'La imagen debe ser una cadena de texto' })
  @MaxLength(100, { message: 'La imagen  no puede tener más de 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  @ApiProperty()
  readonly imagen: string;

  @IsNotEmpty({ message: 'El campo precio es obligatorio' })
  @IsNumber({}, { message: 'El campo precio debe ser de tipo número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  @ApiProperty()
  readonly precio: number;

  @IsNotEmpty({ message: 'El campo stock es obligatorio' })
  @IsNumber({}, { message: 'El campo stok debe ser de tipo número' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  @ApiProperty()
  readonly stock: number;

  @IsDefined({ message: 'el id del autor es obligatorio' })
  @IsInt({ message: 'El id del autor debe ser un numero entero' })
  @ApiProperty()
  readonly idAutor: number;

  @IsDefined({ message: 'El id de la categoria es obligatorio' })
  @IsInt({ message: 'El id de la categoria debe ser un numero entero' })
  @ApiProperty()
  readonly idCategoria: number;
}
