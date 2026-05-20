import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsDateString,
  Min,
} from 'class-validator';

export class CriarTrilhaInput {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  pontoEncontro: string;

  @IsDateString()
  dataInicio: string;

  @IsInt()
  @Min(1)
  vagasMaximas: number;
}
