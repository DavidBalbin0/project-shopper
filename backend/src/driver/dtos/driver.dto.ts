import {IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class DriverDto {
  @IsNotEmpty({ message: 'O ID do motorista não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID do cliente deve ser um número.' })
  id: number;

  @IsNotEmpty({ message: 'O nome do motorista não pode estar vazio.' })
  @IsString({ message: 'O nome do motorista deve ser uma string.' })
  name: string;
}
