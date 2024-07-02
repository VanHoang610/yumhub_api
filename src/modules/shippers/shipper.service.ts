import { Injectable } from '@nestjs/common/decorators/core';
import { InjectModel } from '@nestjs/mongoose';
import { promises } from 'dns';
import { Model } from 'mongoose';
import { ShipperDto } from 'src/dto/dto.shipper';
import { Shipper } from 'src/schemas/shipper.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Order } from 'src/schemas/order.schema';
import { RegisterShipperDto } from 'src/dto/dto.registerShipper';
import { LoginDto } from 'src/dto/dto.login';
import { ResetPassword } from 'src/schemas/resetPass.schema';
import { Mailer } from 'src/helper/mailer';
import { OrderStatus } from 'src/schemas/orderStatus.schema';
import { HistoryMerchantDto } from 'src/dto/dto.historyMerchant';
import { HistoryWalletShipper } from 'src/schemas/historyWalletShipper.schma';
import { TransactionTypeShipper } from 'src/schemas/transantionTypeShipper.schame';
import { JwtService } from '@nestjs/jwt';
import { Review } from 'src/schemas/review.schema';
const { ObjectId } = require('mongodb');

//check document
import axios from 'axios';
import * as FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { DocumentShipper } from 'src/schemas/documentShipper.schema';

@Injectable()
export class ShipperService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Shipper.name) private shipperModel: Model<Shipper>,
    @InjectModel(DocumentShipper.name)
    private documentShipperModal: Model<DocumentShipper>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(ResetPassword.name)
    private resetPasswordModel: Model<ResetPassword>,
    @InjectModel(HistoryWalletShipper.name)
    private historyShipperModel: Model<HistoryWalletShipper>,
    @InjectModel(TransactionTypeShipper.name)
    private typeShipperModel: Model<TransactionTypeShipper>,
    @InjectModel(OrderStatus.name) private statusModel: Model<OrderStatus>,
    @InjectModel(Review.name) private reviewModel: Model<Review>,
  ) {}

  async addData() {
    try {
      const shippers = await this.shipperModel.create([
        {
          _id: '6604e1ec5a6c5ad8711aebf9',
          phoneNumber: '0776616818',
          fullName: 'Lilllie',
          avatar: 'http://dummyimage.com/143x100.png/cc0000/ffffff',
          sex: 'Female',
          birthDay: '6/25/2023',
          address: '61 Schurz Point',
          rating: 4,
          email: 'lkillingsworth0@webmd.com',
          password:
            '$2a$04$Dsy.uYNPE9BwplGCe7jHVO26VyZmgBNfwiQuFmlxYdJ0UMxGFZOou',
          brandBike: '0527-1537',
          modeCode: 'Purple',
          idBike:
            '$2a$04$qUdzkcwnmTJRu/yf7ctpwuRbBDebzPQDUFtAIQ0JyuT2XgTdQzRpu',
          active: false,
          longitude: 112.5766579,
          latitude: -6.9852949,
          joinDay: '11/23/2023',
          balance: 50000,
        },
        {
          _id: '6604e1ec5a6c5ad8711aebfa',
          phoneNumber: '07766168182',
          fullName: 'Greg',
          avatar: 'http://dummyimage.com/144x100.png/ff4444/ffffff',
          sex: 'Male',
          birthDay: '5/13/2023',
          address: '98 Namekagon Hill',
          rating: 5,
          email: 'giorns1@buzzfeed.com',
          password:
            '$2a$04$UafAK9VpiE/nDrz5DRsdRuXtJXmi5vetagD.VWIgb3zuc7vbFt6vy',
          brandBike: '36987-2308',
          modeCode: 'Yellow',
          idBike:
            '$2a$04$Y9WIWV2Du0NeGtxM/zJ1ZOar/UWF7xgVuGMDZMh/GeyzAZyaplZ2a',
          active: false,
          longitude: 95.8601611,
          latitude: 20.8765931,
          joinDay: '11/23/2023',
          balance: 50000,
        },
        {
          _id: '6604e1ec5a6c5ad8711aebfb',
          phoneNumber: '0776216818',
          fullName: 'Wright',
          avatar: 'http://dummyimage.com/198x100.png/dddddd/000000',
          sex: 'Male',
          birthDay: '1/15/2024',
          address: '51417 La Follette Avenue',
          rating: 5,
          email: 'wgoodship2@wired.com',
          password:
            '$2a$04$W9yagCFueutFvqabUHgL9.SIKARf8zsHA6VclJKTDEQ2k4eyLkLfS',
          brandBike: '0409-1171',
          modeCode: 'Violet',
          idBike:
            '$2a$04$/zOzvhL8ZQhwhzbmwC.Gg.eUJxfl0UD2tsrv9.8zDmOcWgBPiOU/q',
          active: false,
          longitude: -104.86783,
          latitude: 50.65009,
          joinDay: '11/23/2023',
          balance: 50000,
        },
        {
          _id: '6604e1ec5a6c5ad8711aebfc',
          phoneNumber: '0776616811',
          fullName: 'Lynnell',
          avatar: 'http://dummyimage.com/220x100.png/5fa2dd/ffffff',
          sex: 'Female',
          birthDay: '6/1/2023',
          address: '5 Ilene Parkway',
          rating: 4,
          email: 'lrideout3@de.vu',
          password:
            '$2a$04$Y4aHyp1FpYiq/MLFAsc.pOrx15NS8aE1nTVldG3VL8ehqrCiFM5xi',
          brandBike: '62175-312',
          modeCode: 'Red',
          idBike:
            '$2a$04$2STPCuPNZ2fcPB7HbjSjdefI0g3..w6Q7UGIDLUZUygqfZWyw7QBa',
          active: true,
          longitude: 11.2533509,
          latitude: 58.695946,
          joinDay: '11/23/2023',
          balance: 50000,
        },
        {
          _id: '6604e1ec5a6c5ad8711aebfd',
          phoneNumber: '0776616815',
          fullName: 'Tristam',
          avatar: 'http://dummyimage.com/103x100.png/ff4444/ffffff',
          sex: 'Male',
          birthDay: '6/9/2023',
          address: '97637 Springview Center',
          rating: 2,
          email: 'twestmacott4@census.gov',
          password:
            '$2a$04$EIjH7l0A6Na8Ws5S2QXH8.h/u2T/ppdJrK.ivjKUJGDspix9J2uZi',
          brandBike: '49643-373',
          modeCode: 'Violet',
          idBike:
            '$2a$04$ONJxx1ONd3XgiHR0oMziyOrOSuYnKfdusIFgzxqGc8p1ieayGug0q',
          active: true,
          longitude: -75.2435307,
          latitude: 20.5800358,
          joinDay: '11/23/2023',
          balance: 50000,
        },
        {
          _id: '666143d9fc13ae29ddb09c2d',
          phoneNumber: '514-438-9304',
          fullName: 'Rudiger',
          avatar:
            'https://robohash.org/velitexconsequatur.png?size=50x50&set=set1',
          birthDay: '9/20/2023',
          sex: 'Male',
          address: '992 Dixon Avenue',
          rating: 2,
          email: 'rlownes2r@prlog.org',
          password:
            '$2a$04$VD0sP8E77qLY9wYY29C24ujgKnodz6hPi0PJit40JJw71Ew.7Hc4a',
          brandBike: 'Ford',
          modeCode: 'Green',
          idBike: 'WA1VGBFP3EA228944',
          longitude: 102.3607061,
          latitude: -0.3592489,
          joinDay: '12/3/2023',
          balance: 897389,
          status: 7,
          deleted: true,
        },
        {
          _id: '666143d9fc13ae25f9b09c2e',
          phoneNumber: '571-339-2789',
          fullName: 'Sinclare',
          avatar:
            'https://robohash.org/etvoluptatemvoluptate.png?size=50x50&set=set1',
          birthDay: '4/25/2003',
          sex: 'Male',
          address: '195 David Street',
          rating: 5,
          email: 'smicallef2q@posterous.com',
          password:
            '$2a$04$XUeN8aaa72ScRd1X.JlB.e1LzvRyD8L0zNjGw1.iAiLpapxfBeHY6',
          brandBike: 'Suzuki',
          modeCode: 'Puce',
          idBike: '1G4CU541X24522501',
          longitude: -77.142764,
          latitude: 38.8822689,
          joinDay: '9/16/2023',
          balance: 8484007,
          status: 5,
          deleted: false,
        },
        {
          _id: '666143d9fc13ae25f9b09c2c',
          phoneNumber: '971-766-9997',
          fullName: 'Kristos',
          avatar:
            'https://robohash.org/reprehenderitquosvel.png?size=50x50&set=set1',
          birthDay: '10/14/2006',
          sex: 'Male',
          address: '41 Rockefeller Street',
          rating: 2,
          email: 'kgoricke2p@goo.ne.jp',
          password:
            '$2a$04$KYZfeJ.pvYux9hpVux4hcODpPdLPQVMT66cKaJPvpzS1QDCa0NQHi',
          brandBike: 'Cadillac',
          modeCode: 'Indigo',
          idBike: 'JTEBU5JR5C5869266',
          longitude: 112.0237903,
          latitude: -7.2030729,
          joinDay: '4/7/2024',
          balance: 8385370,
          status: 6,
          deleted: true,
        },
        {
          _id: '666143d9fc13ae25f9b09c2b',
          phoneNumber: '133-220-3379',
          fullName: 'Tate',
          avatar: 'https://robohash.org/velquiarerum.png?size=50x50&set=set1',
          birthDay: '2/21/2010',
          sex: 'Female',
          address: '1172 Di Loreto Road',
          rating: 1,
          email: 'tmavin2o@pbs.org',
          password:
            '$2a$04$opMXYQlVPyXNcSOmS8Qhj.NE9o23.7Z86U9kf6HMlNWwjpPx.mcOK',
          brandBike: 'Mercury',
          modeCode: 'Purple',
          idBike: '1G6AZ5S32F0650622',
          longitude: 121.3009798,
          latitude: 24.9936281,
          joinDay: '5/6/2024',
          balance: 4647343,
          status: 8,
          deleted: false,
        },
        {
          _id: '666143d9fc13ae25f9b09c2a',
          phoneNumber: '383-815-1461',
          fullName: 'Danie',
          avatar:
            'https://robohash.org/velitbeataeaccusantium.png?size=50x50&set=set1',
          birthDay: '4/25/2007',
          sex: 'Male',
          address: '6180 Old Gate Pass',
          rating: 3,
          email: 'dmccoveney2n@homestead.com',
          password:
            '$2a$04$tt1QcH8d0lJpg815Nt1DLOfzmCXaTNaF0bcflqtM/aWFj1pQvqxha',
          brandBike: 'Ford',
          modeCode: 'Puce',
          idBike: '1C6RD7JT3CS594385',
          longitude: 34.374358,
          latitude: 53.3249623,
          joinDay: '8/24/2022',
          balance: 6915361,
          status: 6,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09be4',
          phoneNumber: '517-546-8362',
          fullName: 'Madelene',
          avatar:
            'https://robohash.org/nesciuntidearum.png?size=50x50&set=set1',
          birthDay: '6/28/2022',
          sex: 'Female',
          address: '7745 Katie Lane',
          rating: 3,
          email: 'mcanelas2m@intel.com',
          password:
            '$2a$04$YjVogQ4CLzWwTfVWQnz/Uua1PRThLnBklIqYYdRrf8l4CzjxBnS1i',
          brandBike: 'Hummer',
          modeCode: 'Teal',
          idBike: '1GYUCJEF3AR658754',
          longitude: 114.18077,
          latitude: 22.279379,
          joinDay: '7/27/2022',
          balance: 440777,
          status: 8,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09be5',
          phoneNumber: '154-168-2312',
          fullName: 'Andros',
          avatar: 'https://robohash.org/aliquidsintqui.png?size=50x50&set=set1',
          birthDay: '3/22/2017',
          sex: 'Male',
          address: '7 Dapin Avenue',
          rating: 2,
          email: 'aransome2l@cbslocal.com',
          password:
            '$2a$04$GunwdJoRNh64E11BA65UU.HI7GuqJecSIXTrqwr3jRf1tC51tE20e',
          brandBike: 'BMW',
          modeCode: 'Purple',
          idBike: 'WA1VMBFE4ED673313',
          longitude: 82.6017244,
          latitude: 49.9749295,
          joinDay: '10/3/2022',
          balance: 4441594,
          status: 1,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09be6',
          phoneNumber: '851-452-1561',
          fullName: 'Tiler',
          avatar:
            'https://robohash.org/delenitieumipsa.png?size=50x50&set=set1',
          birthDay: '5/19/2009',
          sex: 'Male',
          address: '873 Thackeray Park',
          rating: 4,
          email: 'tcoddington2k@epa.gov',
          password:
            '$2a$04$I2PYXATuGCMejBU6S5wySOCuNYrz1c65afOePaECnQU3XoF4WZ/16',
          brandBike: 'GMC',
          modeCode: 'Khaki',
          idBike: '3GYFNCEY5BS931384',
          longitude: -49.7743404,
          latitude: -26.095133,
          joinDay: '3/31/2024',
          balance: 2323542,
          status: 8,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09be7',
          phoneNumber: '543-604-2134',
          fullName: 'Court',
          avatar:
            'https://robohash.org/assumendalaboriosamoccaecati.png?size=50x50&set=set1',
          birthDay: '8/5/2019',
          sex: 'Male',
          address: '087 Lillian Road',
          rating: 5,
          email: 'cclarycott2j@slideshare.net',
          password:
            '$2a$04$NQOsBQ8AjxNiS7NSYa/.Ee0Fal/hBhWXozyc78RrWalVlllxp915a',
          brandBike: 'GMC',
          modeCode: 'Green',
          idBike: 'WDCGG5GB6BF800908',
          longitude: 109.6795545,
          latitude: -6.8762522,
          joinDay: '7/15/2022',
          balance: 5984683,
          status: 8,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09be8',
          phoneNumber: '315-823-6995',
          fullName: 'Tana',
          avatar:
            'https://robohash.org/laudantiumutvel.png?size=50x50&set=set1',
          birthDay: '8/31/2003',
          sex: 'Female',
          address: '3 Shelley Park',
          rating: 4,
          email: 'tbenthall2i@slate.com',
          password:
            '$2a$04$Z/IIh9Gc6JWlyEfjTdZPg.pf8yloOm7H4F/8hPMM44WQXB8KAHh2u',
          brandBike: 'Mazda',
          modeCode: 'Indigo',
          idBike: 'JN8AF5MR2BT548354',
          longitude: 88.021674,
          latitude: 28.899664,
          joinDay: '4/11/2024',
          balance: 7768220,
          status: 5,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09be9',
          phoneNumber: '535-541-6002',
          fullName: 'Matti',
          avatar: 'https://robohash.org/sedundeenim.png?size=50x50&set=set1',
          birthDay: '3/24/2024',
          sex: 'Female',
          address: '1 Barby Hill',
          rating: 3,
          email: 'mrustan2h@mozilla.com',
          password:
            '$2a$04$oWlFZ3UmJL/5RU1bPD3Ov.zgpoa/R0svSoaM3YbNc81tpUEInWyIG',
          brandBike: 'Lexus',
          modeCode: 'Crimson',
          idBike: '19XFB4F21EE858306',
          longitude: 105.7904148,
          latitude: 31.3265959,
          joinDay: '12/27/2022',
          balance: 5572787,
          status: 3,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09bea',
          phoneNumber: '483-321-2075',
          fullName: 'Stacee',
          avatar: 'https://robohash.org/atqueestfugit.png?size=50x50&set=set1',
          birthDay: '11/19/2019',
          sex: 'Male',
          address: '71607 Surrey Place',
          rating: 3,
          email: 'syakov2g@nytimes.com',
          password:
            '$2a$04$LmjjDlLfXhnDEN.jkFD/MuIjkDwLxAfmYGkvOItUX1j45QvBtjpyC',
          brandBike: 'Chrysler',
          modeCode: 'Crimson',
          idBike: '1G6AB1R36F0578794',
          longitude: 124.783659,
          latitude: 40.731316,
          joinDay: '3/6/2023',
          balance: 3899507,
          status: 2,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09beb',
          phoneNumber: '934-117-2726',
          fullName: 'Damien',
          avatar:
            'https://robohash.org/assumendasuscipitcumque.png?size=50x50&set=set1',
          birthDay: '3/13/2006',
          sex: 'Male',
          address: '25003 Summer Ridge Trail',
          rating: 4,
          email: 'dmacdougallc@reuters.com',
          password:
            '$2a$04$Ir7TcOP7WMHqQkfhkEw1ruEoJfbzHpt6LZm5XRCqY06Ve6gQtwbAW',
          brandBike: 'Mitsubishi',
          modeCode: 'Yellow',
          idBike: '1FTEW1CW5AK543809',
          longitude: 121.050126,
          latitude: 14.3839328,
          joinDay: '2/22/2024',
          balance: 144224,
          status: 2,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09bec',
          phoneNumber: '535-336-8198',
          fullName: 'Theo',
          avatar:
            'https://robohash.org/solutaofficiisut.png?size=50x50&set=set1',
          birthDay: '12/26/2005',
          sex: 'Male',
          address: '614 Tomscot Hill',
          rating: 1,
          email: 'tbythewayd@va.gov',
          password:
            '$2a$04$1z1zXKY0fXTe0Ejc2xHCMO4uvM2uThkt9ec.nsSLgZGLb9XhNtRMm',
          brandBike: 'Ford',
          modeCode: 'Goldenrod',
          idBike: 'WBA3N5C50EK539035',
          longitude: 116.3877778,
          latitude: 39.7825,
          joinDay: '9/5/2021',
          balance: 6787408,
          status: 6,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09bed',
          phoneNumber: '392-727-7826',
          fullName: 'Conn',
          avatar: 'https://robohash.org/etnonnon.png?size=50x50&set=set1',
          birthDay: '7/18/2012',
          sex: 'Male',
          address: '8934 Independence Alley',
          rating: 1,
          email: 'cwherrye@shareasale.com',
          password:
            '$2a$04$Yyc6LVP4BXKGerzbq3MRRO4WThO0qW/v05ZNnLsfgLyOJPWAKBuDa',
          brandBike: 'GMC',
          modeCode: 'Green',
          idBike: '4USBU53517L284758',
          longitude: 17.1072974,
          latitude: 49.8582058,
          joinDay: '6/2/2024',
          balance: 2462993,
          status: 6,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09bee',
          phoneNumber: '265-391-8362',
          fullName: 'Carmon',
          avatar:
            'https://robohash.org/perferendisnecessitatibushic.png?size=50x50&set=set1',
          birthDay: '11/14/2016',
          sex: 'Female',
          address: '166 Ohio Hill',
          rating: 2,
          email: 'cshimonyf@hatena.ne.jp',
          password:
            '$2a$04$P6HEhBy1tFJj4t6U6FiU9emThXyAZtf/Vnz30mlQmjuDQKkGNqMRe',
          brandBike: 'Chevrolet',
          modeCode: 'Red',
          idBike: 'WBAFR9C51DC239294',
          longitude: 39.2695629,
          latitude: 57.007322,
          joinDay: '2/13/2023',
          balance: 7704455,
          status: 3,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09bef',
          phoneNumber: '635-100-0954',
          fullName: 'Sonya',
          avatar:
            'https://robohash.org/voluptatibusautemillo.png?size=50x50&set=set1',
          birthDay: '4/7/2022',
          sex: 'Female',
          address: '7266 Westend Park',
          rating: 2,
          email: 'ssamwellg@nasa.gov',
          password:
            '$2a$04$YIuUN/cDonrh/M0DJUm5WOKCKq02fpYWgLZvKyCx2vE7Fj/VXyhiu',
          brandBike: 'Volkswagen',
          modeCode: 'Pink',
          idBike: '1G4GD5GR3CF042146',
          longitude: -65.896638,
          latitude: -47.7375833,
          joinDay: '8/4/2023',
          balance: 9672161,
          status: 8,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09bf0',
          phoneNumber: '671-972-8664',
          fullName: 'Clayton',
          avatar: 'https://robohash.org/rerumestqui.png?size=50x50&set=set1',
          birthDay: '6/28/2006',
          sex: 'Male',
          address: '405 Badeau Avenue',
          rating: 5,
          email: 'ccurdellh@blogger.com',
          password:
            '$2a$04$kbpuKGKzDk7HeGUCCDZ2reyr5s9IecnaDrSaVS.xTODYM/G/E8UIC',
          brandBike: 'Chevrolet',
          modeCode: 'Maroon',
          idBike: '1B3CB2HA8AD745414',
          longitude: 99.7509296,
          latitude: 15.1751306,
          joinDay: '7/6/2022',
          balance: 5870517,
          status: 7,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09bf1',
          phoneNumber: '889-162-1190',
          fullName: 'Haily',
          avatar:
            'https://robohash.org/molestiaevoluptatemmodi.png?size=50x50&set=set1',
          birthDay: '7/5/2004',
          sex: 'Female',
          address: '09 Dottie Crossing',
          rating: 5,
          email: 'hmertschingi@meetup.com',
          password:
            '$2a$04$/FaBvHWLRFtI8h/Uzzr.CeHKe9oqpwv2FF2MLUb8YsGzkQkQ0OtwS',
          brandBike: 'Chevrolet',
          modeCode: 'Orange',
          idBike: 'WAUKF98P29A704606',
          longitude: -68.7259306,
          latitude: 11.1626327,
          joinDay: '5/14/2022',
          balance: 2113466,
          status: 6,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09bf2',
          phoneNumber: '654-291-3448',
          fullName: 'Peggy',
          avatar:
            'https://robohash.org/distinctiovoluptasab.png?size=50x50&set=set1',
          birthDay: '8/15/2001',
          sex: 'Female',
          address: '3057 Sunfield Drive',
          rating: 4,
          email: 'pvearsj@nyu.edu',
          password:
            '$2a$04$hxxlYfsf8xiu4mT6z.tv5.IHRpLClMuEPeqq.d4rZsePSEVemaXw2',
          brandBike: 'Volkswagen',
          modeCode: 'Maroon',
          idBike: '5FRYD4H44EB393465',
          longitude: 12.8846277,
          latitude: 49.9718258,
          joinDay: '12/19/2022',
          balance: 3256238,
          status: 4,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09bf3',
          phoneNumber: '615-339-0371',
          fullName: 'Jolie',
          avatar: 'https://robohash.org/quiamagni.png?size=50x50&set=set1',
          birthDay: '9/16/2012',
          sex: 'Female',
          address: '10 Mariners Cove Park',
          rating: 2,
          email: 'jgarardk@plala.or.jp',
          password:
            '$2a$04$eNvzIdwi/xh65IOniANaJeNjm1DvOdhMrWS6YJzS.Z9rFbGZq0gH6',
          brandBike: 'Dodge',
          modeCode: 'Violet',
          idBike: 'YV440MBM1F1296011',
          longitude: 111.3479498,
          latitude: -6.7098551,
          joinDay: '11/25/2023',
          balance: 4746713,
          status: 4,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09bf4',
          phoneNumber: '847-801-2697',
          fullName: 'Rikki',
          avatar: 'https://robohash.org/sintidducimus.png?size=50x50&set=set1',
          birthDay: '8/15/2004',
          sex: 'Male',
          address: '5 Sullivan Circle',
          rating: 5,
          email: 'rclinel@buzzfeed.com',
          password:
            '$2a$04$aRMUKANrVs9itqaaNps2t.zaFWkgdAiQg69A03G/BVeGyUr8kRwba',
          brandBike: 'Pontiac',
          modeCode: 'Crimson',
          idBike: '1C6RD6MT4CS255916',
          longitude: 120.666775,
          latitude: 16.065782,
          joinDay: '8/28/2021',
          balance: 2021391,
          status: 1,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09bf5',
          phoneNumber: '531-136-5467',
          fullName: 'Tate',
          avatar:
            'https://robohash.org/veniamquasaccusamus.png?size=50x50&set=set1',
          birthDay: '6/7/2002',
          sex: 'Female',
          address: '02116 Loftsgordon Way',
          rating: 3,
          email: 'telwinm@redcross.org',
          password:
            '$2a$04$pKrmpGXht/1o/qRd/z/piuUR5/tnrmByaBTh4J4CkYgoLw23UZx3G',
          brandBike: 'Nissan',
          modeCode: 'Crimson',
          idBike: '19UUA568X3A939973',
          longitude: 32.8986812,
          latitude: -4.3920698,
          joinDay: '6/6/2021',
          balance: 5767197,
          status: 8,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09bf6',
          phoneNumber: '210-104-1091',
          fullName: 'Jorgan',
          avatar: 'https://robohash.org/autrerumet.png?size=50x50&set=set1',
          birthDay: '8/5/2011',
          sex: 'Male',
          address: '18053 Petterle Drive',
          rating: 3,
          email: 'jbussonsn@ask.com',
          password:
            '$2a$04$azba6vt41lQo6qvQJ2Nl.u3kJFvfWITHZV4ow4Tz2mM6p6FlTfKN2',
          brandBike: 'Ford',
          modeCode: 'Goldenrod',
          idBike: 'WBAAW33411E354680',
          longitude: -7.0390904,
          latitude: 33.8521783,
          joinDay: '6/15/2022',
          balance: 4315739,
          status: 1,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09bf7',
          phoneNumber: '405-855-2655',
          fullName: 'Lorettalorna',
          avatar:
            'https://robohash.org/reprehenderitodioest.png?size=50x50&set=set1',
          birthDay: '12/1/2014',
          sex: 'Female',
          address: '61302 Tomscot Hill',
          rating: 1,
          email: 'lvictoro@skype.com',
          password:
            '$2a$04$SxzPRKCuLqt5wNQzs8pn5.wIY3YfDx6FMOZf43tSsfHkzBQ2J7t1y',
          brandBike: 'Hyundai',
          modeCode: 'Teal',
          idBike: '1GYFK63808R036779',
          longitude: 48.5260928,
          latitude: 41.3643024,
          joinDay: '6/29/2021',
          balance: 259643,
          status: 1,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09bf8',
          phoneNumber: '644-830-2972',
          fullName: 'Darryl',
          avatar:
            'https://robohash.org/rerumculpaearum.png?size=50x50&set=set1',
          birthDay: '11/19/2021',
          sex: 'Female',
          address: '7747 Clove Pass',
          rating: 3,
          email: 'dclackp@ameblo.jp',
          password:
            '$2a$04$IWyKYMCtUBWnZexLlfZB3.JnsEJRtsOlGgSHl9X0ebiMw4fMuaauK',
          brandBike: 'Saturn',
          modeCode: 'Green',
          idBike: 'WAUMFBFL8DN775424',
          longitude: 22.7546149,
          latitude: 50.1062428,
          joinDay: '9/7/2021',
          balance: 1395388,
          status: 4,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09bf9',
          phoneNumber: '641-849-1859',
          fullName: 'Janette',
          avatar:
            'https://robohash.org/autdolorperferendis.png?size=50x50&set=set1',
          birthDay: '12/6/2021',
          sex: 'Female',
          address: '13 Del Mar Road',
          rating: 3,
          email: 'janeleyq@prweb.com',
          password:
            '$2a$04$szjDnZOW9HEEPPieTcv8NeaPneatIVyG9rcgLMa2FMXZX0AYeSN8i',
          brandBike: 'Volkswagen',
          modeCode: 'Indigo',
          idBike: '3D4PH6FV7AT090526',
          longitude: -86.6762176,
          latitude: 12.3434106,
          joinDay: '8/9/2022',
          balance: 7201685,
          status: 1,
          deleted: true,
        },
        {
          _id: '6661419cfc13ae26b1b09bfa',
          phoneNumber: '659-275-0475',
          fullName: 'Jess',
          avatar: 'https://robohash.org/dictaaab.png?size=50x50&set=set1',
          birthDay: '7/6/2010',
          sex: 'Female',
          address: '17829 Hazelcrest Pass',
          rating: 1,
          email: 'jpowlingr@deliciousdays.com',
          password:
            '$2a$04$P/TLbcEzAGxYDbdrx6AfJe5hS/L.WGGcJH3VGrRSpXyqbomnMcWem',
          brandBike: 'Suzuki',
          modeCode: 'Yellow',
          idBike: '1FTEW1C82AK269731',
          longitude: -81.9248,
          latitude: 45.97927,
          joinDay: '9/23/2022',
          balance: 7858823,
          status: 8,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09bfb',
          phoneNumber: '731-336-1826',
          fullName: 'Jud',
          avatar:
            'https://robohash.org/quaeofficiadolorum.png?size=50x50&set=set1',
          birthDay: '9/24/2012',
          sex: 'Male',
          address: '899 Hovde Way',
          rating: 3,
          email: 'jrobleys@arizona.edu',
          password:
            '$2a$04$KsLDnz16q4eynFaphqQ8nuD9TEfyIkLvn4od05DqSrTxm2oJ9CRqu',
          brandBike: 'Mazda',
          modeCode: 'Green',
          idBike: 'JM1NC2LF6F0469241',
          longitude: 101.803717,
          latitude: 36.599744,
          joinDay: '1/8/2022',
          balance: 2013443,
          status: 5,
          deleted: false,
        },
        {
          _id: '6661419cfc13ae26b1b09bfc',
          phoneNumber: '321-252-8348',
          fullName: 'Bella',
          avatar:
            'https://robohash.org/liberomolestiaenostrum.png?size=50x50&set=set1',
          birthDay: '11/11/2011',
          sex: 'Female',
          address: '0 Maple Wood Street',
          rating: 5,
          email: 'bbartult@drupal.org',
          password:
            '$2a$04$YvGa2E.079A/4Ebis6fe0ueZ1qbD29o6B3lsF1.vmhmAuVNQJUpxW',
          brandBike: 'Audi',
          modeCode: 'Maroon',
          idBike: '1N6AD0CUXAC276917',
          longitude: -80.6720617,
          latitude: 28.2123183,
          joinDay: '7/14/2022',
          balance: 2988548,
          status: 7,
          deleted: false,
        },
      ]);
      return { result: true, customerNew: shippers };
    } catch (error) {
      return { result: false, customerNew: error };
    }
  }

  async createShipper(shipperDto: RegisterShipperDto) {
    try {
      const existingShipper = await this.shipperModel.findOne({
        email: shipperDto.email,
      });
      if (existingShipper) {
        throw new HttpException('Shipper already exists', HttpStatus.CONFLICT);
      }

      const {
        phoneNumber,
        email,
        avatar,
        fullName,
        sex,
        birthDay,
        address,
        brandBike,
        modeCode,
        idBike,
        idCardBackSide,
        idCardFontSide,
        driverLicenseBackSide,
        driverLicenseFontSide,
        parrotCarFontSide,
        parrotCarBackSide,
      } = shipperDto;

      if (
        !idCardBackSide ||
        !idCardFontSide ||
        !driverLicenseBackSide ||
        !driverLicenseFontSide ||
        !parrotCarFontSide ||
        !parrotCarBackSide
      ) {
        throw new HttpException(
          'ID card and driver license and parrot car images are required',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newShipper = new this.shipperModel({
        phoneNumber,
        email,
        avatar,
        fullName,
        sex,
        birthDay,
        address,
        brandBike,
        modeCode,
        idBike,
        status: 1,
        joinDay: Date.now(),
      });

      await newShipper.save();
      const idShipper = newShipper._id;

      //căn cước
      const typeIDCard = new ObjectId('66642316fc13ae0853b09bb7');
      const documentShipperTypeIDCard = new this.documentShipperModal({
        shipperID: idShipper,
        documentTypeID: typeIDCard,
        imageBackSide: idCardBackSide,
        imageFontSide: idCardFontSide,
      });
      await documentShipperTypeIDCard.save();

      // bằng lái
      const typeDriverLicense = new ObjectId('66642316fc13ae0853b09bb8');
      const documentShipperTypeDriver = new this.documentShipperModal({
        shipperID: idShipper,
        documentTypeID: typeDriverLicense,
        imageBackSide: driverLicenseBackSide,
        imageFontSide: driverLicenseFontSide,
      });
      await documentShipperTypeDriver.save();

      // giấy tờ xe
      const typeParrotCar = new ObjectId('6667dc72a588bba5a76a9ec4');
      const documentShipperTypeParrot = new this.documentShipperModal({
        shipperID: idShipper,
        documentTypeID: typeParrotCar,
        imageBackSide: parrotCarBackSide,
        imageFontSide: parrotCarFontSide,
      });
      await documentShipperTypeParrot.save();

      return {
        result: true,
        createShipper: newShipper,
        documents: [
          documentShipperTypeIDCard,
          documentShipperTypeDriver,
          documentShipperTypeParrot,
        ],
      };
    } catch (error) {
      console.log(error);
      return { result: false, error };
    }
  }

  async getAllShipper() {
    try {
      const idCard_id = new ObjectId('66642316fc13ae0853b09bb7'); // cccd
      const driverLicense_id = new ObjectId('66642316fc13ae0853b09bb8'); // giấy phép lái xe
      const vehicleCertificate_id = new ObjectId('6667dc72a588bba5a76a9ec4'); // giấy tờ xe

      const documents = async (idShipper, type) => {
        const document = await this.documentShipperModal.findOne({
          shipperID: idShipper,
          documentTypeID: type,
        });
        return {
          front: document ? document.imageFontSide : null,
          back: document ? document.imageBackSide : null,
        };
      };

      const shippers = await this.shipperModel.find({
        deleted: false,
        status: { $ne: 1 },
      });
      if (shippers.length === 0) {
        return { result: false, message: 'No shipper found' };
      }

      const promises = shippers.map(async (shipper) => {
        const idCard = await documents(shipper._id, idCard_id);
        const driverLicense = await documents(shipper._id, driverLicense_id);
        const vehicleCertificate = await documents(
          shipper._id,
          vehicleCertificate_id,
        );

        return {
          ...shipper.toObject(),
          idCard,
          driverLicense,
          vehicleCertificate,
        };
      });

      const shipperData = await Promise.all(promises);
      return { result: true, AllShipper: shipperData };
    } catch (error) {
      return { result: false, error: error.message };
    }
  }

  async getHistory(id: string) {
    try {
      const orders = await this.orderModel
        .find({ shipperID: id })
        .sort({ timeBook: 1 })
        .populate('customerID')
        .populate('merchantID')
        .populate('shipperID')
        .populate('voucherID');
      if (!orders) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

      return { result: true, historyShipper: orders };
    } catch (error) {
      return { result: false, historyShipper: error };
    }
  }

  async updateLocation(id: string, longitude: number, latitude: number) {
    try {
      const shipper = await this.shipperModel.findByIdAndUpdate(
        id,
        { longitude: longitude, latitude: latitude },
        { new: true },
      );
      if (!shipper)
        throw new HttpException('Update fail location', HttpStatus.NOT_FOUND);
      await shipper.save();
      return { result: true, newLocation: shipper };
    } catch (error) {
      return { result: false, newLocation: error };
    }
  }

  async deleteShipper(id: string) {
    try {
      const ShipperById = await this.shipperModel.findById(id);
      const updateUserID = await this.shipperModel.findByIdAndUpdate(
        ShipperById,
        { deleted: true },
        { new: true },
      );

      if (updateUserID) {
        return { result: true, isDelete: 'Xóa thành công Shipper' };
      } else {
        throw new Error('Không tìm thấy ID Shipper');
      }
    } catch (error) {
      console.error('Error delete Shipper:', error);
      throw error;
    }
  }

  async updateShipper(id: string, updateShipper: ShipperDto) {
    try {
      const shipperNew = await this.shipperModel.findByIdAndUpdate(
        id,
        updateShipper,
        { new: true },
      );
      return { result: true, data: shipperNew };
    } catch (error) {
      console.error('Error updating shipper:', error);
      return { result: false, error };
    }
  }
  async updateAvatar(id: string, avatar: string) {
    return await this.shipperModel.findByIdAndUpdate(id, { avatar });
  }

  async login(user: LoginDto) {
    try {
      const checkAccount = await this.shipperModel.findOne({
        phoneNumber: user.phoneNumber,
        status: { $gt: 2 },
        deleted: false,
      });

      if (!checkAccount)
        throw new HttpException('Không đúng SDT', HttpStatus.NOT_FOUND);
      const compare = await bcrypt.compare(
        user.password,
        checkAccount.password,
      );
      if (!compare)
        throw new HttpException('Không đúng mật khẩu', HttpStatus.NOT_FOUND);

      // Tạo token
      const payload = {
        phoneNumber: checkAccount.phoneNumber,
        sex: checkAccount.sex,
        email: checkAccount.email,
        fullName: checkAccount.fullName,
        avatar: checkAccount.avatar,
        birthDay: checkAccount.birthDay,
        joinDay: checkAccount.joinDay,
        brandBike: checkAccount.brandBike,
        modeCode: checkAccount.modeCode,
        idBike: checkAccount.idBike,
      };
      const token = await this.jwtService.signAsync(payload);
      checkAccount.password = undefined;
      return { result: true, data: { checkAccount, token } };
    } catch (error) {
      return { result: false, data: error };
    }
  }

  async forgetPassByEmail(email: string) {
    try {
      const user = await this.shipperModel.findOne({ email: email });
      if (!user)
        throw new HttpException('Email chưa đăng ký', HttpStatus.NOT_FOUND);

      const otp = Math.floor(1000 + Math.random() * 9000);

      const passwordRest = new this.resetPasswordModel({
        email: email,
        otp: otp,
      });
      await passwordRest.save();

      await Mailer.sendMail({
        email: user.email,
        subject: 'Khôi phục mật khẩu',
        content: `Mã OTP của bạn là: ${otp}`,
      });

      setTimeout(async () => {
        await this.resetPasswordModel.deleteOne({ email: email });
      }, 120000);

      return { result: true, message: 'Hãy kiểm tra email của bạn!' };
    } catch (error) {
      return { result: false, message: 'Gửi OTP thất bại' };
    }
  }

  async checkOTP(email: string, otp: string) {
    try {
      const user = await this.resetPasswordModel.findOne({
        email: email,
        otp: otp,
      });
      if (!user) throw new HttpException('Not Find', HttpStatus.NOT_FOUND);
      await this.resetPasswordModel.deleteOne({ email: email });
      return { result: true, message: 'Xác nhận OTP thành công' };
    } catch (error) {
      return { result: false, message: 'OTP thất bại' };
    }
  }

  async resetPass(email: string, password: string) {
    try {
      const user = await this.shipperModel.findOne({ email: email });
      if (!user)
        throw new HttpException('Not Find Account', HttpStatus.NOT_FOUND);
      const passwordNew = await bcrypt.hash(password, 10);
      user.password = passwordNew;
      user.save();
      return { result: true, data: user };
    } catch (error) {
      return { result: false, data: error };
    }
  }

  async changePass(id: string, passOld: string, passNew: string) {
    try {
      const existingUser = await this.shipperModel.findById(id);
      if (!existingUser)
        throw new HttpException('Not Find Account', HttpStatus.NOT_FOUND);

      const compare = await bcrypt.compare(passOld, existingUser.password);
      if (!compare)
        throw new HttpException('Password Fail', HttpStatus.NOT_FOUND);

      const hashPassNew = await bcrypt.hash(passNew, 10);

      existingUser.password = hashPassNew;
      await existingUser.save();
      return { result: true, data: existingUser };
    } catch (error) {
      console.error('Error in changePass:', error);
      return { result: false, data: error };
    }
  }

  async verifileShipper(email: string) {
    try {
      const user = await this.shipperModel.findOne({ email: email });
      if (!user)
        throw new HttpException('Email chưa đăng ký', HttpStatus.NOT_FOUND);

      const password = Math.floor(100000 + Math.random() * 900000).toString();
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
      user.status = 2;
      await user.save();

      const passwordRest = new this.resetPasswordModel({
        email: email,
        otp: password,
      });
      await passwordRest.save();

      await Mailer.sendMail({
        email: user.email,
        subject: 'Chúc mừng bạn đã trở thành đối tác của YumHub',
        content: `Email của bạn là: ${email}
                            Password của bạn là: ${password}`,
      });

      setTimeout(async () => {
        await this.resetPasswordModel.deleteOne({ email: email });
      }, 120000);

      return { result: true, message: 'Hãy kiểm tra email của bạn!' };
    } catch (error) {
      console.log(error);
      return { result: false, message: 'Gửi thất bại' };
    }
  }
  async revenueShipperTimeTwoTime(
    id: string,
    dateStart: string,
    dateEnd: string,
  ) {
    try {
      const start = new Date(dateStart).setHours(0, 0, 0, 0);
      const end = new Date(dateEnd).setHours(23, 59, 59, 999);
      const DeliveredID = await this.statusModel.findOne({ name: 'success' });
      const CancelID = await this.statusModel.findOne({ name: 'cancel' });
      // Tính tổng doanh thu
      var totalRevenue = 0;
      var payByBanking = 0;
      var payByZalo = 0;
      var payByCash = 0;
      const shipper = await this.shipperModel.findById(id);
      if (!shipper) {
        return { result: 'nhập sai ID Shipper', revenue: 0, cancel: 0 };
      }
      // Lấy tất cả các hóa đơn của merchant trong khoảng thời gian đã cho
      const orders = await this.orderModel.find({
        shipperID: Object(id), // Chuyển đổi ID thành ObjectId ở đây
        timeBook: { $gte: start, $lte: end },
        status: DeliveredID?._id, // Sử dụng DeliveredID?._id để tránh lỗi nếu không tìm thấy
      });
      const orderCancel = await this.orderModel.find({
        shipperID: Object(id), // Chuyển đổi ID thành ObjectId ở đây
        timeBook: { $gte: start, $lte: end },
        status: CancelID?._id, // Sử dụng CancelID?._id để tránh lỗi nếu không tìm thấy
      });

      var numberOfOrders = 0;
      for (const order of orders) {
        numberOfOrders += 1;
        totalRevenue += order.revenueDelivery;
        if (order.paymentMethod == 1) {
          payByBanking += order.revenueDelivery;
        } else if (order.paymentMethod == 2) {
          payByZalo += order.revenueDelivery;
        } else if (order.paymentMethod == 3) {
          payByCash += order.revenueDelivery;
        }
      }
      var numberOfOrderCancel = 0;
      for (const order of orderCancel) {
        numberOfOrderCancel += 1;
      }
      return {
        result: true,
        revenue: totalRevenue,
        success: numberOfOrders,
        cancel: numberOfOrderCancel,
        payByBanking: payByBanking,
        payByZalo: payByZalo,
        payByCash: payByCash,
      };
    } catch (error) {
      return { result: false, revenue: error, cancel: error };
    }
  }
  async getRevenueWeek(ID: string) {
    try {
      const currentDate = new Date();
      var currentDay = currentDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
      if (currentDay == 0) {
        currentDay = 7;
      }
      const startOfWeek = new Date(currentDate);
      startOfWeek.setHours(0, 0, 0, 0); // Set to 00:00:00.000
      startOfWeek.setDate(startOfWeek.getDate() - currentDay + 1); // Set to Monday of current week
      const startDate = startOfWeek.toString();
      const endOfWeek = new Date(currentDate);
      endOfWeek.setHours(23, 59, 59, 999); // Set to 23:59:59.999
      endOfWeek.setDate(endOfWeek.getDate() - currentDay + 7); // Set to Sunday of current week
      const endDate = endOfWeek.toString();
      const result = this.revenueShipperTimeTwoTime(ID, startDate, endDate);
      return {
        result: true,
        revenue: (await result).revenue,
        success: (await result).success,
        cancel: (await result).cancel,
      };
    } catch (error) {
      return { result: false, revenue: error };
    }
  }
  async getRevenueMonth(ID: string, month: string) {
    try {
      const [targetYear, targetMonth] = month
        .split('-')
        .map((part) => parseInt(part, 10));
      const firstDateMonth = new Date(targetYear, targetMonth - 1, 1);

      const startDate = firstDateMonth.toString();
      const firstDateNextMonth = new Date(targetYear, targetMonth, 1);
      const lastDateOfMonth = new Date(firstDateNextMonth.getTime() - 1);
      const endDate = lastDateOfMonth.toString();
      console.log(startDate, endDate);
      const result = this.revenueShipperTimeTwoTime(ID, startDate, endDate);
      return {
        result: true,
        revenue: (await result).revenue,
        success: (await result).success,
        cancel: (await result).cancel,
      };
    } catch (error) {
      return { result: false, revenue: error };
    }
  }

  async listShipperApproval() {
    try {
      const listShipper = await this.shipperModel.find({
        status: 1,
        deleted: false,
      });
      if (listShipper.length === 0) {
        return { result: true, listShipper: listShipper };
      }
      const idCard_id = new ObjectId('66642316fc13ae0853b09bb7'); // cccd
      const driverLicense_id = new ObjectId('66642316fc13ae0853b09bb8'); // giấy phép lái xe
      const vehicleCertificate_id = new ObjectId('6667dc72a588bba5a76a9ec4'); // giấy tờ xe

      const documents = async (idShipper, type) => {
        const document = await this.documentShipperModal.findOne({
          shipperID: idShipper,
          documentTypeID: type,
        });
        return {
          front: document ? document.imageFontSide : null,
          back: document ? document.imageBackSide : null,
        };
      };
      const promise = await listShipper.map(async (shipper) => {
        const idCard = await documents(shipper._id, idCard_id);
        const driverLicense = await documents(shipper._id, driverLicense_id);
        const vehicleCertificate = await documents(
          shipper._id,
          vehicleCertificate_id,
        );

        return {
          ...shipper.toObject(),
          idCard,
          driverLicense,
          vehicleCertificate,
        };
      });
      const shipperData = await Promise.all(promise);
      return { result: true, listShipper: shipperData };
    } catch (error) {
      return { result: false, error };
    }
  }

  async getShipperById(id: string) {
    try {
      const idCard_id = new ObjectId('66642316fc13ae0853b09bb7'); // cccd
      const driverLicense_id = new ObjectId('66642316fc13ae0853b09bb8'); // giấy phép lái xe
      const vehicleCertificate_id = new ObjectId('6667dc72a588bba5a76a9ec4'); // giấy tờ xe

      const [document1, document2, document3, shipper] = await Promise.all([
        this.documentShipperModal.findOne({
          shipperID: id,
          documentTypeID: idCard_id,
        }),
        this.documentShipperModal.findOne({
          shipperID: id,
          documentTypeID: driverLicense_id,
        }),
        this.documentShipperModal.findOne({
          shipperID: id,
          documentTypeID: vehicleCertificate_id,
        }),
        this.shipperModel.findOne({ _id: id }),
      ]);

      const detailShipper = {
        ...shipper.toObject(),
        idCard: {
          front: document1 ? document1.imageFontSide : null,
          back: document1 ? document1.imageBackSide : null,
        },
        driverLicense: {
          front: document2 ? document2.imageFontSide : null,
          back: document2 ? document2.imageBackSide : null,
        },
        vehicleCertificate: {
          front: document3 ? document3.imageFontSide : null,
          back: document3 ? document3.imageBackSide : null,
        },
      };

      return { result: true, detailShipper: detailShipper };
    } catch (error) {
      return { result: false, error };
    }
  }

  async topUptopUpShipper(id: string, topUp: HistoryMerchantDto) {
    try {
      const shipper = await this.shipperModel.findById(id);
      const idShipper = shipper._id;

      const typeShipper = await this.typeShipperModel
        .findOne({ name: 'topUp' })
        .exec();

      const currentBalance = shipper.balance;
      const updateBalance = currentBalance + topUp.amountTransantion;
      shipper.balance = updateBalance;
      await shipper.save();
      const createHistory = await this.historyShipperModel.create({
        shipperID: idShipper,
        amountTransantion: topUp.amountTransantion,
        description: topUp.description,
        transantionType: typeShipper._id,
        time: new Date(),
      });
      return { result: true, WalletShipper: createHistory };
    } catch (error) {
      console.log(error);
      return { result: false, error };
    }
  }

  async cashOutShipper(id: string, topUp: HistoryMerchantDto) {
    try {
      const shipper = await this.shipperModel.findById(id);
      const idShipper = shipper._id;

      const typeShipper = await this.typeShipperModel
        .findOne({ name: 'topUp' })
        .exec();

      const currentBalance = shipper.balance;
      const updateBalance = currentBalance - topUp.amountTransantion;
      shipper.balance = updateBalance;
      await shipper.save();
      const createHistory = await this.historyShipperModel.create({
        shipperID: idShipper,
        amountTransantion: topUp.amountTransantion,
        description: topUp.description,
        transantionType: typeShipper._id,
        time: new Date(),
      });
      return { result: true, WalletShipper: createHistory };
    } catch (error) {
      return { result: false, error };
    }
  }

  async transactionHistory(id: string) {
    try {
      const shipper = await this.shipperModel.findById(id);
      const idShipper = shipper._id;
      const history = await this.historyShipperModel
        .find({ shipperID: idShipper })
        .exec();
      return { result: true, TransactionHistory: history };
    } catch (error) {
      return { result: false, error };
    }
  }

  async newShipperInMonth() {
    try {
      const today = new Date();
      var amount = 0;
      var id = [];
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      );
      const lasterDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      );
      const newShippers = await this.shipperModel.find({
        joinDay: { $gte: firstDayOfMonth, $lte: lasterDayOfMonth },
      });

      for (const Shipper of newShippers) {
        amount += 1;
        id.push(Shipper._id);
      }
      return { result: true, amount: amount, ID: id };
    } catch (error) {
      return { result: false, error: error };
    }
  }
  async getRating(id: string) {
    const orders = await this.orderModel.find({ shipperID: id }).exec();
    if (!orders) {
      return { result: true, rating: 0 };
    }
    const typeOfReviewObjectId = new ObjectId('6604e5a181084710d45efe9d'); // customer review shipper
    var numberOfReview = 0;
    var totalPointReview = 0;
    for (const order of orders) {
      const reviews = await this.reviewModel.find({
        orderID: order._id,
        typeOfReview: typeOfReviewObjectId,
      });
      for (const review of reviews) {
        totalPointReview += review.rating;
        numberOfReview += 1;
      }
    }
    const rating = numberOfReview > 0 ? totalPointReview / numberOfReview : 0;
    return { result: true, rating: rating };
  }

  async checkDriverLicenseDocument(image: string): Promise<any> {
    try {
      const apiKey = 'Y3n5OWk2LJukIzk08KGDipA5oIwzW73V';
      const apiUrl = 'https://api.fpt.ai/vision/dlr/vnm';

      // Tải hình ảnh từ URL và lưu vào một tệp tạm thời
      const response = await axios({
        url: image,
        method: 'GET',
        responseType: 'stream',
      });

      const tempFilePath = path.join(os.tmpdir(), path.basename(image));
      const writer = fs.createWriteStream(tempFilePath);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      // Gửi tệp tạm thời đến API của FPT.AI
      const form = new FormData();
      form.append('image', fs.createReadStream(tempFilePath));

      const headers = {
        ...form.getHeaders(),
        api_key: apiKey,
      };

      const apiResponse = await axios.post(apiUrl, form, { headers });

      // Xóa tệp tạm thời sau khi sử dụng
      fs.unlinkSync(tempFilePath);

      return apiResponse.data;
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi khi gửi yêu cầu:', error);
      return { success: false, message: 'Do not ID card' };
    }
  }

  async getShipperIsDeleted() {
    const deletedShipper = await this.shipperModel.find({ deleted: true });
    return { result: true, deletedShipper: deletedShipper };
  }

  async getAllDocument(id: string) {
    try {
      const document = await this.documentShipperModal
        .find({ shipperID: id })
        .populate('documentTypeID');
      if (!document)
        throw new HttpException(
          'Not find document shipper',
          HttpStatus.NOT_FOUND,
        );
      return { result: true, document: document };
    } catch (error) {
      return { result: false, document: error };
    }
  }

  async findShipper(keyword: string) {
    try {
      const shippers = await this.shipperModel.find({
        $or: [
          { fullName: new RegExp(keyword, 'i') }, // thường hay hoa đều được
          { address: new RegExp(keyword, 'i') },
          { idBike: new RegExp(keyword, 'i') },
        ],
      });
      if (shippers.length === 0) {
        return { result: false, message: 'Not Found Shippers', shippers: [] };
      }
      return { result: true, shippers: shippers };
    } catch (error) {
      return { result: false, shippers: error };
    }
  }

  async findDeletedShipper(keyword: string) {
    try {
      const shippers = await this.shipperModel.find({
        $and: [
          {
            $or: [
              { fullName: new RegExp(keyword, 'i') }, // thường hay hoa đều được
              { address: new RegExp(keyword, 'i') },
              { idBike: new RegExp(keyword, 'i') },
            ],
          },
          { deleted: true },
        ],
      });
      if (shippers.length === 0) {
        return { result: false, message: 'Not Found Shippers', shippers: [] };
      }
      return { result: true, shippers: shippers };
    } catch (error) {
      return { result: false, shippers: error };
    }
  }

  async findApproveShipper(keyword: string) {
    try {
      const shippers = await this.shipperModel.find({
        $and: [
          {
            $or: [
              { fullName: new RegExp(keyword, 'i') },
              { idBike: new RegExp(keyword, 'i') },
            ],
          },
          { status: { $in: [1, 2] } },
        ],
      });
      if (shippers.length === 0) {
        return { result: false, message: 'Not Found Shipper', shippers: [] };
      }
      return { result: true, shippers: shippers };
    } catch (error) {
      return { result: false, shippers: error };
    }
  }
}
