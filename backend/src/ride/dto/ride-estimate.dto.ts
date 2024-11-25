import { IsNotEmpty, IsString } from 'class-validator';

export class RideEstimateDto {
  @IsNotEmpty({ message: 'O ID do cliente não pode estar vazio.' })
  @IsString({ message: 'O ID do cliente deve ser uma string.' })
  customer_id: string;

  @IsNotEmpty({ message: 'O endereço de origem não pode estar vazio.' })
  @IsString({ message: 'O endereço de origem deve ser uma string.' })
  origin: string;

  @IsNotEmpty({ message: 'O endereço de destino não pode estar vazio.' })
  @IsString({ message: 'O endereço de destino deve ser uma string.' })
  destination: string;
}
