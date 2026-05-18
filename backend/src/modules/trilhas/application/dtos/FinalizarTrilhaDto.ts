import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ParticipanteDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  codigoConfirmacao: string;
}

export class FinalizarTrilhaDto {
  @IsString()
  @IsNotEmpty()
  trilhaId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ParticipanteDto)
  participantes: ParticipanteDto[];
}
