import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  car: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  ratePerKm: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  minKm: number;
}
