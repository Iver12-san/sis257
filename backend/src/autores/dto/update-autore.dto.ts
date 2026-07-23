import { PartialType } from '@nestjs/swagger';
import { CreateAutoreDto } from './create-autore.dto';

export class UpdateAutoreDto extends PartialType(CreateAutoreDto) {}
