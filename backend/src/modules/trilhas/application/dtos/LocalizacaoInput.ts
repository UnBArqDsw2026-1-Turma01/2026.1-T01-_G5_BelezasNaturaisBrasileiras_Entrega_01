import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CidadeInput {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  pontos: string[];
}

export class LocalizacaoInput {
  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CidadeInput)
  cidades: CidadeInput[];
}
