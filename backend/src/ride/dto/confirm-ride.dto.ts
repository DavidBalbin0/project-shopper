import {
  IsNotEmpty,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DriverDto } from './driver.dto';

export class ConfirmRideDto {
  @IsNotEmpty({ message: 'O ID do cliente não pode estar vazio.' })
  @IsString({ message: 'O ID do cliente deve ser uma string.' })
  customer_id: number;

  @IsNotEmpty({ message: 'O endereço de origem não pode estar vazio.' })
  @IsString({ message: 'O endereço de origem deve ser uma string.' })
  origin: string;

  @IsNotEmpty({ message: 'O endereço de destino não pode estar vazio.' })
  @IsString({ message: 'O endereço de destino deve ser uma string.' })
  destination: string;

  @IsNotEmpty({ message: 'A distância não pode estar vazia.' })
  @IsNumber({}, { message: 'A distância deve ser um número.' })
  distance: number;

  @IsNotEmpty({ message: 'A duração não pode estar vazia.' })
  @IsString({ message: 'A duração deve ser uma string.' })
  duration: string;

  @ValidateNested()
  @Type(() => DriverDto)
  driver: DriverDto;

  @IsNotEmpty({ message: 'O valor não pode estar vazio.' })
  @IsNumber({}, { message: 'O valor deve ser um número.' })
  value: number;
}
