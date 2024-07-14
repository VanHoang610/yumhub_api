import { IsNumber, IsString, IsOptional } from 'class-validator';

export class WebhookDataDto {
  @IsNumber()
  orderCode: number;

  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsString()
  accountNumber: string;

  @IsString()
  reference: string;

  @IsString()
  transactionDateTime: string;

  @IsString()
  currency: string;

  @IsString()
  paymentLinkId: string;

  @IsString()
  code: string;

  @IsString()
  desc: string;

  @IsOptional()
  @IsString()
  counterAccountBankId?: string | null;

  @IsOptional()
  @IsString()
  counterAccountBankName?: string | null;

  @IsOptional()
  @IsString()
  counterAccountName?: string | null;

  @IsOptional()
  @IsString()
  counterAccountNumber?: string | null;

  @IsOptional()
  @IsString()
  virtualAccountName?: string | null;

  @IsOptional()
  @IsString()
  virtualAccountNumber?: string | null;
}
