import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class RejectShipperDto {

    image: boolean
    name: boolean
    address: boolean
    email: boolean
    phoneNumber: boolean
    birthDay: boolean
    brandBike: boolean
    modeCode: boolean
    idBike: boolean
    idCard: boolean
    driverLicense: boolean
    vehicleCertificate: boolean
    notes:string
}