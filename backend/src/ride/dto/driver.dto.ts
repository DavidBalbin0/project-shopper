import { IsNotEmpty, IsString } from 'class-validator';

export class DriverDto {
  @IsNotEmpty({ message: 'O ID do motorista não pode estar vazio.' })
  @IsString({ message: 'O ID do motorista deve ser uma string.' })
  id: number;

  @IsNotEmpty({ message: 'O nome do motorista não pode estar vazio.' })
  @IsString({ message: 'O nome do motorista deve ser uma string.' })
  name: string;
}
