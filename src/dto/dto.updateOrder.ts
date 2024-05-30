import { IsOptional } from 'class-validator'; // kiểm tra validate
import { Customer } from 'src/schemas/customer.schemas';
import { Merchant } from 'src/schemas/merchant.schema';
import { OrderStatus } from 'src/schemas/orderStatus.schema';
import { Shipper } from 'src/schemas/shipper.schema';
import { Voucher } from 'src/schemas/voucher.schema';

export class UpdateOrderDto {
  @IsOptional()
  customerID: Customer;

  @IsOptional()
  merchantID: Merchant;

  @IsOptional()
  shipperID: Shipper;

  @IsOptional()
  voucherID: Voucher;

  @IsOptional()
  deliveryAddress: string;

  @IsOptional()
  priceFood: number;

  @IsOptional()
  deliveryCost: number;

  @IsOptional()
  totalPaid: number;

  @IsOptional()
  timeBook?: Date;

  @IsOptional()
  timeGetFood?: Date;

  @IsOptional()
  timeGiveFood: Date;

  @IsOptional()
  totalDistance?: string;

  @IsOptional()
  status: any;

  @IsOptional()
  imageGetFood?: string;

  @IsOptional()
  imageGiveFood?: string;

  @IsOptional()
  revenueMerchant?: string;

  @IsOptional()
  revenueDelivery?: string;

  @IsOptional()
  paymentMethod?: number;
}
