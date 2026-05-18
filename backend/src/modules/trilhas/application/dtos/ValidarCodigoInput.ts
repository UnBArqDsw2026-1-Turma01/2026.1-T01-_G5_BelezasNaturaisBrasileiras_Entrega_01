import { IsString, IsNotEmpty } from 'class-validator';

export class ValidarCodigoInput {
  @IsString()
  @IsNotEmpty()
  codigo: string;
}
