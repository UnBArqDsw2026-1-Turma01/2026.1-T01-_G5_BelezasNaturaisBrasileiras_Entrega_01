import { IsString, IsNotEmpty } from 'class-validator';

export class FazerCheckinInput {
  @IsString()
  @IsNotEmpty()
  codigo: string;
}
