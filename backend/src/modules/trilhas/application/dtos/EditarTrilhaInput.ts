import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class EditarTrilhaInput {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  pontoEncontro?: string;

  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  vagasMaximas?: number;
}
