import { Injectable } from '@nestjs/common/decorators/core'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from 'src/dto/dto.order';
import { Order } from 'src/schemas/order.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Customer } from 'src/schemas/customer.schemas';
import { Merchant } from 'src/schemas/merchant.schema';
import { Shipper } from 'src/schemas/shipper.schema';
import { Voucher } from 'src/schemas/voucher.schema';
import { OrderStatus } from 'src/schemas/orderStatus.schema';



@Injectable()
export class OrderService {

    constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
        @InjectModel(Merchant.name) private merchantModel: Model<Merchant>,
        @InjectModel(Shipper.name) private shipperModel: Model<Shipper>,
        @InjectModel(Voucher.name) private voucherModel: Model<Voucher>,
        @InjectModel(OrderStatus.name) private statusModel: Model<OrderStatus>,

    ) { };

    async addData() {
        try {
            const orders = await this.orderModel.create([
                {
                    "_id": "660c9dc319f26b917ea15837",
                    "customerID": "6604de8e26f9a8b37aeb30d0",
                    "merchantID": "660c99c2fc13ae788b50fbe0",
                    "shipperID": "6604e1ec5a6c5ad8711aebf9",
                    "voucherID": "660c9b03fc13ae76f950fb0c",
                    "deliveryAddress": "08 Monument Street",
                    "priceFood": 158784,
                    "deliveryCost": 41249,
                    "totalPaid": 1347215,
                    "timeBook": "3/16/2024",
                    "timeGetFood": "9/3/2023",
                    "timeGiveFood": "1/10/2024",
                    "totalDistance": 5,
                    "status": "6604e7c381084710d45efea5","imageGetFood": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKaSURBVDjLrZNdSFNhGMdPF15EdOO94E230kXR6sIZZl4VkRiVMdOLiqC6sMgr08hQQUqUnBFJbRqKpa6yrw2bzm162lduY2dubjvbbF/Oj+WZuu38e8+hdRNGUA/8eDnw/P/v83FeCgD1L1D/1YBhmBKCwuVyKZxOp8LhcIzZ7fax+fl5hc1mU1itVoXZbC75zcDtdpcSYWBxcRGJRALLy8siyWRSPOPxuEg0GgUxBU3Tgbm5uVLRgIjLiZhfWVlBPMziy5thTD59iPG223jZcl1E1d6Iyf4umCZGSE4QsVgMRqORNxgM5ULZFkGcyWTExAenDv4RVUcjUqmUaDIzM2OhSDnrGo0GPM8jS0w+ytuhvFmLRxfK0XVaItIrq8DgrTrQfefhV9Xhm0kptjQ9Pb1GKZXKUCQSQTqdRjabFc/t7W0RobI8Yb0cidkbyKRmsaS+CJduCFNTU16qu7t7GD9DKI1MH4JhfnACQWM/YloZMqsKrNqbkTA0wTtQjU/yhneUVCqtzBsIfZG1wePxwO/3w+fzQdiM5/U1bCWHsLnUhM3IY6zamsCxzWDkZWtUYWHh4fztglgQBYNBsCyLQCAgfi98uIfv3nZw/qtIsw3gfLXg3NUw3ZGkqIKCgkNklZZcLieWKwjC4TBCoRBY+yQCE5cQ0tRjnZGBWziJtLcGGy4ibtmfeX62+BxFYrdgMjo66iRGsFgs4gyC9CB8IzWk1D5seKrAMcdh6pHC2nEMtjbp1gtZcdWvP5HELsIerVY7QnbLC32H3l8hPT/D+lcJOGclzL1HMSa/y2vejr/6LCvau+Nj0uv1RTqdLutR1WMreh8bzAnQPWVQPWnNqdXqor9+jbOdB1od/RVRuvOIf+DyvjM75f0AOEMKvrn+ie0AAAAASUVORK5CYII=",
                    "imageGiveFood": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKzSURBVBgZBcFfqN5zHADg5/P9/d53/87OmdnU2jIttiGJEZO1SSh2YcWFXHCBEpIibsiVO3GhlhIXascF7maoiY200iSbIYZxmv3/55yd877v7/vxPJGZ7nplz6MLxuc9XMIGzEeAQAZZjWr9/eyp3B3nz7ywd/vWAUBkpntf+2bv+89suLqUWJI0EoBMSCf+G9rx3Vn/Hpmb+enAz0u/3r51DlooTazrt82Sg8c1JYIgK11Wo1G6OOxsuWqxW9a29tUTC7OuP7P56Z2XfPXWfXMFImIsM5t+U/QKbdAUmiCCIlCtGO/bevMKV1w5b0E7vug9KJAEFJSgRCgRSoQSoTTh6OmLVo8NXbM0PL7xUk2veRBagEzahhAyQu2SEtqGfha/nUqDOlLrwKY180RbRtBCJok2ipQSUUIgK9kUetXS39421h12sW4hVoECiYoISoQSoUSIDL0m9EoYO/KB1Uv/tmbzI5z+zFo/FChQR2RSkchMpFIoEeb/87FV7Zcm1t1k+q9degtWemr1F/1dz655qIVaU2aSpAQggd65703cep9u5qD5y1aZ7f6xesu1yszx7S10lS7JSgWQoCbD/krDM38qzUlRpvXHTzI747+jc00LdZRqple/HwipBplh5ewhD3rHxKKhOppV6lnKYjkc+HHysF9/OfVEC6NRp+tYMd5z42VFTZYd2+ny6Q+t3bhRDj4X3QUHPh0YTs9Z0g9vTj0wnJx8abKF0Vyto1pz0Ilvpzo10mPnPrF+0x0GJ7dr2wk/ftn5qPeks9ff443bSz343Ldz0MJwtju2qN8se/G6waLMLJL2h0Y0U5p5yx36YkZv3ZNevu1+Eer8frnQjeoUtBCRr9/9/J5tEXFDyoWwbXm/vfuPfc350yPvHr5zdGj/4s7kbpitte5vix3wP04jPQSDxpk/AAAAAElFTkSuQmCC"
                }, {
                    "_id": "660c9dc319f26b917ea15833",
                    "customerID": "6604de8e26f9a8b37aeb30d0",
                    "merchantID": "6604e35881084710d45efe8c",
                    "shipperID": "6604e1ec5a6c5ad8711aebfa",
                    "voucherID": "660c9b03fc13ae76f950fb0c",
                    "deliveryAddress": "9 Sachtjen Lane",
                    "priceFood": 95168,
                    "deliveryCost": 20601,
                    "totalPaid": 1741165,
                    "timeBook": "9/14/2023",
                    "timeGetFood": "10/24/2023",
                    "timeGiveFood": "7/30/2023",
                    "totalDistance": 5,"status": "6604e7c381084710d45efea6",
                    "imageGetFood": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIBSURBVDjLpZPdS9NRGMe98zLw/H47QxDCLoqgC/+E/oJpL1qtNxMlRkhIYO7CoJuwQLqILoPwpWnkluKknNWVXVTWXnzZ3Ku65ftsm7/z+w3p23NGQbFZji4enodz+DzP9/twTgWAiv+JkofinblS5t235vbdN2a17AYEQebcFEfWw+/I+tskxz8bEOj5DQwI/0UQOL7zmu+lX/FNebc1YTq66TbVlGyQneLfMx6OzCQP5VOPIEMPd0JP3AOBLgKxMW5CkQKaxgm8JWuahvzXxwR2QczboC/cgBGxQ4t0Y23MhH0tSJBkIue1wojfhZhthQg0Q/gvU1yCEbVj52MjUi4VSaeK5RG1ssgCyUwXZNNUEbhaADXfeWjes6TmGnLBDgIVZ5EC8uaW3jIzF5BP9kLMtUEuUPOdI/gMtC8WUmQlG7ex8d6C+HMFsWGlqkjB6qj6MOu/Dj3YTqCETxdgzVtPe7iJ9WkLokNKS8TB2sIOdviPBqmXqjVJ/rY/NMFYfkBNbKSiCcJ3CvqiDVufriDuqkX4GUPJJa6MqE9kXnqh3E+6jyPtJRvRLhgxO7Y/tyDmrMXiIKsODbC+4AB7uu9LJG9S5pHE6DGQzMTadANCg6yHQAT7meOvL5HAE+TvkKxpWkEqTdMX+lm3rOf7qoYP9Bd+gr+gOoqTZX2mcuIHSo3eNm+GAIoAAAAASUVORK5CYII=",
                    "imageGiveFood": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIdSURBVDjLpdNfSFNxFAfwX+GbSGjhg+JDED2YBYVGSPiQJigYRRZGUBD0UuBDT2rkIjOV/LsH5/5oIlE9yHSbFsy5TV3zH3soZcQWtD+CmjPXcru62f127q9YM8gH93D4wf1xPuece89lAFgy8d+LrtOyLGO2WudOe+t1pQ55LJnq0ea7+b1NVTmgMFCU7wmEmE1EmRewh4E3G0DeZwQz5hETNjD29CxHOCDPlR2MsnHtFjNFBTYOgVkQYVag7SuwIAD+GDBL51QY1pF++EzP8PLBKQm4wwHlsYZUkb2fQs86oPkG9FCMhgAbVTbQ6RB+P5cHoKguwNJEBzpuH5WALA5os9uPI+XDRw5c8gEVFPWrlERtWwmZoFDR3a3l7cHaAriHqqVkxF/idJrmMtKdPqioyhU/ULkEyFaAgSC1HgFGqAvFOjxNzqC19QK+vHu0G/AzbSOer31HHVW9QcBNAp7Q/K8JcEcB4w9AH8Jwiw7OgeuYlpdKwGIcCLMxPVXY4a2X0luvJegVJZs2AWXgJ0q8EZR4YjPX9BwYri+UgIa/e3DANovOANBPM7+gMbTU8kkXfQm76M2fdKB5rWqrzNV3JicTi31Xobp3QgKK4oDliFK9ygzhTWYWQ8wkrjDjtvmwxp64E5RQrLmfxztInH/PRfoHaNE9Pp8U8GlOUZEUwJPNrRfjK7wvYPDhOQmo2Q/Q/ecvlM5DiXe/ADHD2LkNLqYxAAAAAElFTkSuQmCC"
                }, {
                    "_id": "660c9dc319f26b917ea15836",
                    "customerID": "6604de8e26f9a8b37aeb30d0",
                    "merchantID": "6604e35881084710d45efe8c",
                    "shipperID": "6604e1ec5a6c5ad8711aebfc",
                    "voucherID": "660c9b03fc13ae76f950fb0a",
                    "deliveryAddress": "5366 Nancy Parkway",
                    "priceFood": 30471,
                    "deliveryCost": 48761,
                    "totalPaid": 1341818,
                    "timeBook": "11/25/2023",
                    "timeGetFood": "6/24/2023",
                    "timeGiveFood": "11/29/2023",
                    "totalDistance": 8,
                    "status": "6604e7c381084710d45efea6","imageGetFood": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH/SURBVBgZBcE/jN9zHAfg5/35fn6/6/XqVEmkISHif2KQRsQgLEg4g4TJYrExYTXabJIbDZJOFoNRQssgERNiYJFeOE21QfTuft/v5+V5Konn3r/0xvbu1uutXMApFCikyDCP8euNa/mi/r7+3uX9vROASuLFD765/MnbFx5prc6GSQBIIK7+u3Hxuxv++O34v59++Pnc1/t7x9ChTfXQuk9nf/zT1KooMlgyzHPc3CyefeAWTz7YfTuuns54+Pozb31+21cfvXTcoKrOJJnWU7Nq9GJqTEUVTWE4v7u298R5996/td13dz6GBqGgoRWtSqvSqrQqbSq//3XTPWc2Hj1X3nzqdtNqeg06QEKfKCVVxhJa6RPrNL9ci5MxG+PE0/dtqd5m6JAQ9GoigmqlkEGmxpo2yhiTaFQDHYKBKkoJggxWE6CaWkpaDCRAhzGTMFBIAlrDKH0KKUKUZbAMoMMYkYQQASBAKRV6Y+DUimUO6LAMlpDBABAwwjIIRkixmpr5ZAYdxhwjsf/lywAAAADgsVc/szkeoMM8L5YFuPuuOwEAAMCVg0MZsTmaQYf5eIx5jKCuHBwCAAAA6L2NeRkzdNgcLYc76+mOd174dCdJEwbg1u0OErZXTZWxmuqfZR4H0KEqHz7/7qVXqurxyGkAIYgAAUdjjO97cxH+Bxjp+96ObDbVAAAAAElFTkSuQmCC",
                    "imageGiveFood": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqSURBVDjLY/j//z8DJZiBKgbkzH9cMHXX6wcgmiwDQJq3nv/4H0SD+OXl5dlA/L+kpOR/QUHB/+zs7P+pqan/ExIS/kdGRv4PDg7+T10XDHwgpsx8VNC56eWDkJ675Hmhbf3zB0uPvP1fuvQpOBDj4uKyIyIi/gcGBv738vL67+zs/N/Gxua/iYnJf11d3f9qamqogRjQcaugZPHjB66V14ZqINrmXyqIn3bvgXXeJfK8ANLcv+3lfxAN4hsZGWVra2v/V1FR+S8nJ/dfXFz8v5CQ0H8eHp7/7Ozs/5mZmVEDEWQzRS6gBAMAYBDQP57x26IAAAAASUVORK5CYII="
                }, {
                    "_id": "660c9dc319f26b917ea15834",
                    "customerID": "6604de8e26f9a8b37aeb30cf",
                    "merchantID": "6604e35881084710d45efe8f",
                    "shipperID": "6604e1ec5a6c5ad8711aebfd",
                    "voucherID": "660c9b03fc13ae76f950fb0a",
                    "deliveryAddress": "21229 Sachs Drive",
                    "priceFood": 92788,
                    "deliveryCost": 41861,
                    "totalPaid": 994412,
                    "timeBook": "2/10/2024",
                    "timeGetFood": "11/3/2023",
                    "timeGiveFood": "8/18/2023",
                    "totalDistance": 4,
                    "status": "6604e7c381084710d45efea6","imageGetFood": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALVSURBVDjLpVO7T1NRGP/dR18iF+iTQktEkHdDCjHgIGAX40AMMhrkD3AxcWBxMnExTigDPhYJcdFFHHxEo5HBVKlaCk1bFJJiaQuhpbS0ve29x3Ov0jiweZLf+ZKT7/t9v+9xGEII/ufwyjU7O3urUCh4SqWSQZIkplgsavL5vFaxsiwzOp1ONBqNL6ampq4p/hMTE/3UrM/Nze0yMzMzNRzHpd1uNxQ1NEBF8OsbXBk9BfHnI0y/64Bg60Q4HJlMpVJ3abBAoUgf4FpaWgI9PT1Gm82GaDSKeDyOnZ0dNDR14P3SNkL7fejtPwuGYbC1tTXGsqxOr9eD53kmk8kM8TRrqyAICAQCsFqtcLlcoKWAlgKLxYJgMIjFxUWYTCZ4PB4kEgmk02nVJxQKtfOKYzKZhNlsRqmqCXfe5pErM5CpPh2jwbDjJIz7+1R+GIpKJTASicBut6ulssqVy+XgdDqxsCyiSFjoNRRaFhKrwYfNKnQ4JYwNboNIWYiiCNrgikqVgHZbRVZiaW0cBQsN+wccR2Dl/ejuuwgLG1T96MRUqypQWA5ZlUOIDGU1GBag8RgUPsF2YhiC3Y065geq2JTqWyE4VEA7Ci0RUZZp/TKh8giMbBJu7UdUm2shZZ6jsXcSrcIGyqWiWkKFQGH0+/1w18TBlQ9QpG8SxWnNazi7LwEFH7yP53G8Ng8Ll0CbtVQh4JXse3t76nhMqRQGmpvV5lQjBredoLrugGZfp7VR0uxnNI9cx4Xd23jyPasScA6HI722tjYci8U4umXKPjCrK8sYaoqifWAUnOwDKe+ioctMOQ6gPaaDQd+FoPcVWf1Veskc9Zl890eumjsv3qtvM9CsXtpUEUvPgugf7wTD1QCG8/jy8EaSyPK5Iwm802c2XZfnGzl2g2ZP/V37w0NHa2hHYuUbwgs3n/JHfdFyUdT7HoznCZ0GzfIPSMVCsYTU/wbkK6iCy8xjQgAAAABJRU5ErkJggg==",
                    "imageGiveFood": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKZSURBVDjLfVNLSFRhFP7uYx44XbyjFommzaKVEkVWRoFY9IYKLGgRLQpqKbhxEYSLiAipcVMLxXalWYuKCIVkiIQ2jaORUiRa+Jg0nNHJx/W+Oue/MwP2+i/nP/+995zv+85//l9yXRf/G/F4/IFlWRdM01TJg7ywtbU19l3SvwCGhoYKKaFD1/WzgUABDEqC40BEU044rKO39xXUvyUnEoljnFxSUlIWCoUwPjEFZnccF47rEJALm8AMw4A6Ojpq2LbtJxNBOZnsU6nU75IxP58iIAeHjxwX31ROLi+vQDq9INhdflxW6QrjF+JEUbgQL54/Q1X1TsHO/4QCRuXk5o44hUmQJJq9SXi2zOIibl/ZLRgH4+/AaktPnvYUsFRm5cBwUTFkWYZEJmeN1wzgOh5j9fYasXazeyCzAnonABmKoqwzOet58OYx45w2js50VJQlFJjZ9kiyBEVV8+zCcwnkvc55jJ2f2rGUsYQKAcATbwiXwIyRTQWifm9ImF6wxGp1oBs1g+2o7Z+FpRdjyeygrkgegJytk23s85/nojYTg//LR9RdakIgUoWV4T6MvH2NslTYA/D5VNy6vEO0xzQtLC8bQrLf76MyXCy0NmPbmUYEx2LAmxsoKNSxtaISk2MJqFTXnVisvy53UMgXaZoW4e4kk0mD1AVqf8wguDkCnGjKq1JbSqEZP7HuLrS1tTUSyKk9e/cd1DQdT588WqGeP9w/fO9ifcM5X+jbSxgrSSxTbGZRQWI8aOUBotHoRmrZbH39IWzQNDrKNlRFJtC7Sw0zj1v9WujalmJLVeVJZOYsTHxXbHPVvZ6/TCR9nux9T0/3rtz5z96LkQNdUy0D5ytWP3ydvqrYUqWtyFN0lO4f7bNu/gJT+aqduOCVCAAAAABJRU5ErkJggg=="
                }, {
                    "_id": "660c9dc319f26b917ea15835",
                    "customerID": "6604de8e26f9a8b37aeb30cd",
                    "merchantID": "6604e35881084710d45efe8f",
                    "shipperID": "6604e1ec5a6c5ad8711aebfa",
                    "voucherID": "660c9b03fc13ae76f950fb06",
                    "deliveryAddress": "46 Sutteridge Park",
                    "priceFood": 108926,
                    "deliveryCost": 10967,
                    "totalPaid": 1132278,
                    "timeBook": "12/3/2023",
                    "timeGetFood": "3/13/2024",
                    "timeGiveFood": "6/6/2023","totalDistance": 7,
                    "status": "6604e7c381084710d45efea8",
                    "imageGetFood": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJPSURBVDjLjZJPSFRRFMZ/7804ODhT42iaxZR/NiEFFVESGFHWTilo1SoqEGplQUQEtnSV4KrARRAELZKgVRshgoggUKgoDCUEIxumxpyZ996995wWM/knDfrgwoUDv++c7xxPVQG4f7mjG3jPRhUHx+cy/EPevUvtB4E7QH8q28r5W8OU8m8AaGg+zMPhm1RKSwCPgInB8bknawFxYOLkmbO7kqk0ZnYKVcWFJQBUld59Ofy2LlT13POnzwaADYDdydQWol+LWLHMPR4FVUDJ61sUJVicp755ZwJI/D1CHABxqLX4me2Is6jK+jmDMlGxvGkGcQAVQaxFTIiYsNbB/6kGsIgz65zvLl8jZpYJIks6244ECgeGuDL2TsUK1ijOuj8Ah1gDziLOgYJvK4xe7SMe8zd1LhQjbox9WAVgDeoEtYKqopGhLuZz+8EnioGjuyXJzEKFdF2MTCrG9GwZZxR/pQMnOCs46xDrEKcoEIRKQj1yrUl+lIRtmThB6NAIvFWAIMahtSdG0KgaZD0gofJ6+icmEha+hXyZj+jZ24BvawBxUnW1DrHVv4uqgZpQ+Vp25AuGjOcxs+DwPeX00VbE1QA4RYwgVlDrUOuQSEGhVBH8UDl1JEt2a5xk0ufYoUaaMgnEKXHgpYmi3oYdOVQUFQEFCnX4MXCR0NFUR//xNqY+LpFWy4meFmK+h2gVMPJicjIN7F+7pqXYAPlCyMjQHlCoBJbrF7pW6t8LITZSPP3H1fVdfPU5Cmxow6C+M9fYKVINWxVUFBEPVPgN0HNzn605xt0AAAAASUVORK5CYII=",
                    "imageGiveFood": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHfSURBVDjLfVI9TwJBEJ2DMxwf1xASSCxsrIwN1TUUFhaUFlr4AwyNsaZQCioqepB/AIWtUaMYGhNiSWdHQUAp4Djue505b83yoZtMZm/vzZs3b1dijAFf3tUlg4NDcB8egLkuMM8D33HAD/NOsQjs8QWST/cSr5FBWGIREwp9OufZdsSSNQLHDUh8ywrAARHlcC9vIYisEOBPhsWwtwcekWBQ9kwTpP198I0lYux/FNhO1TTNyvT0DHQ1BWY0Cg5Jn89B+fyC7PMrqIj5k+Dj5nrIDENP7+6mFPz2fR+4yUgM79GobhwfDc+FGokDBoOB5rruXTabzc2x43K5DAgoIpEIxGKxILrd7siyrJNSqfS24gFKLWcymdxsNgPDMMDDG6AgAhpD1/XgPJ/P51BNecNEBBVIDXV2yfWwOwUnWywWkEwmARUUNjywbTtNYF4Mggfid+hHehvBL1jM63sKi656fQQ8nHJD+excPt9LkhQoJOw2gh7NT07zrmLQWTweh/F4TGp7GwQ4V63f748URYFEIrHiAXUm82RZhk6nM0KC2sY7oNVqtS5QSVXTtJyqqj+vM1QzmUyg3W6P8LYqjUbjdisBrXq9riFJGbsU6GbIXCyaYvQwas1m803EfwO4vsGvr9ICrgAAAABJRU5ErkJggg=="
                }
            ])
            return { result: true, order: orders }
        } catch (error) {
            return { result: false, order: error }
        }
    }

    async createOrder(orderDto: OrderDto) {
        try {
            const customerID = orderDto.customerID;
            const customers = await this.customerModel.findById(customerID);
            if (!customers) throw new HttpException("Not Found Customer", HttpStatus.NOT_FOUND);

            const merchantID = orderDto.merchantID;
            const merchants = await this.merchantModel.findById(merchantID);
            if (!merchants) throw new HttpException("Not Found Merchant", HttpStatus.NOT_FOUND);

            const shipperID = orderDto.shipperID;
            const shippers = await this.shipperModel.findById(shipperID);
            if (!shippers) throw new HttpException("Not Found Shipper", HttpStatus.NOT_FOUND);

            const voucherID = orderDto.voucherID;const vouchers = await this.voucherModel.findById(voucherID);
            if (!vouchers) throw new HttpException("Not Found Voucher", HttpStatus.NOT_FOUND);

            const status = this.getStatusPending()

            const orders = new this.orderModel({
                customerID: customers._id,
                merchantID: merchants._id,
                shipperID: shippers._id,
                voucherID: vouchers._id,
                timeBook: Date.now(),
                status: status,
                ...orderDto
            });

            await orders.save();
            return { success: true, order: orders };

        } catch (error) {
            return { success: false, order: error };
        }
    }


    async getAllOrder() {
        try {
            const orders = await this.orderModel.find().populate('customerID').populate('merchantID').populate('shipperID').populate('voucherID');
            if (!orders) return { Message: "Not found Order" }
            return { result: true, order: orders }
        } catch (error) {
            return { result: false, order: error }
        }
    }

    async sortHistory() {
        try {
            const orderSort = await this.orderModel.find({}).sort({ timeBook: 1 }).exec();
            return { result: true, orderSort: orderSort }
        } catch (error) {
            return { result: false, orderSort: error }
        }
    }

    async getOrderById(id: string) {
        try {
            const orders = await this.orderModel.findById(id);
            if (!orders) return { Message: "Not found Order" }
            return { result: true, order: orders }
        } catch (error) {
            return { result: false, order: error }
        }
    }
    // lấy id của Đơn hàng đã được tạo nhưng chưa được xác nhận hoặc xử lý.
    async getStatusPending() {
        let idStatus: object;
        const Statuss = await this.statusModel.find().exec();
        for (const status of Statuss) {
            if (status.name === "Pending") {
                idStatus = status._id
                break
            }
        }
        return idStatus
    }
    async setStatusPending(orderId: string) {
        let idStatus = this.getStatusPending
        const updatedOrder = await this.orderModel.findOneAndUpdate(
            { _id: orderId },
            { status: idStatus },
            { new: true } // Trả về bản ghi đã cập nhật
        );



    }
    //Đơn hàng đang được xử lý, đang trong quá trình chuẩn bị hoặc đang chờ đợi để được giao.
    async setStatusProcessing(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "Processing") {
                    idStatus = status._id
                    break
                }
            }const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }

    }
    //Đơn hàng đã được giao cho nhà vận chuyển hoặc đang trên đường đi đến địa chỉ của khách hàng.
    async setStatusShipped(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "Shipped") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }
    }
    //Đơn hàng đã được giao thành công và được nhận bởi khách hàng.
    async setStatusDelivered(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "Delivered") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }
    }
    //Đơn hàng đã bị hủy trước khi được giao hoặc sau khi đã được giao.
    async setStatusCancel(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "Cancel") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }
    }
    //Đơn hàng đang bị tạm ngưng xử lý, thường do các vấn đề tài chính hoặc thông tin không chính xác từ khách hàng.
    async setStatusOnHold(orderId: string) {
        try {
            let idStatus: object;const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "OnHold") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }
    }
    async setStatusBackordered(orderId: string) {
        try {
            let idStatus: object;
            const Statuss = await this.statusModel.find().exec();
            for (const status of Statuss) {
                if (status.name === "Backordered") {
                    idStatus = status._id
                    break
                }
            }
            const updatedOrder = await this.orderModel.findOneAndUpdate(
                { _id: orderId },
                { status: idStatus },
                { new: true } // Trả về bản ghi đã cập nhật
            );
            return "Đã thay đổi trạng thái"
        } catch (error) {
            return error
        }
    }
    async setStatus(orderId: string, status: string | number) {
        try {
            let idStatus: object;
            const parsedStatus = parseInt(status as string);
            const Statuss = await this.statusModel.find().exec();
            switch (parsedStatus) {
                case 1:
                    // Xử lý khi biến có giá trị là value1


                    for (const status of Statuss) {
                        if (status.name === "Pending") {
                            idStatus = status._id
                            break
                        }
                    }
                    break;
                case 2:
                    // Xử lý khi biến có giá trị là value2

                    for (const status of Statuss) {
                        if (status.name === "Processing") {
                            idStatus = status._id
                            break
                        }
                    }

                    break;
                case 3:
                    // Xử lý khi biến có giá trị là value3
                    for (const status of Statuss) {
                        if (status.name === "Shipped") {
                            idStatus = status._id
                            break
                        }
                    }
                    break;
                case 4:
                    // Xử lý khi biến có giá trị là value4
                    for (const status of Statuss) {
                        if (status.name === "Delivered") {
                            idStatus = status._id
                            break
                        }}
                        break;
                    case 5:
                        // Xử lý khi biến có giá trị là value5
                        for (const status of Statuss) {
                            if (status.name === "Cancel") {
                                idStatus = status._id
                                break
                            }
                        }
                        break;
                    case 6:
                        // Xử lý khi biến có giá trị là value6
                        for (const status of Statuss) {
                            if (status.name === "OnHold") {
                                idStatus = status._id
                                break
                            }
                        }
                        break;
                    case 7:
                        // Xử lý khi biến có giá trị là value7
                        for (const status of Statuss) {
                            if (status.name === "OnHold") {
                                idStatus = status._id
                                break
                            }
                        }
                        break;
                    default:
                        return typeof status;
    
                }
                const updatedOrder = await this.orderModel.findOneAndUpdate(
                    { _id: orderId },
                    { status: idStatus },
                    { new: true } // Trả về bản ghi đã cập nhật
                );
                return "Đã thay đổi trạng thái"
            } catch (error) {
                return error
            }
        }
    
    
    }