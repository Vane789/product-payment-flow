import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../../application/services/order.service';
import { PaymentService } from 'src/application/services/payment.service';
import { UserService } from 'src/application/services/user.service';
import { Order } from '../../application/model/orderDTO';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: any): Promise<any> {
    console.log('Received data:', createOrderDto);
    const paymentData = createOrderDto.payment;
    console.log('paymentData ', paymentData);
    const userData = createOrderDto.user;
    console.log('paymentData ', paymentData);
    const newPayment = await this.paymentService.createPayment(paymentData);
    console.log('New payment created:', newPayment);
    const newUser = await this.userService.createUser(userData);
    console.log('New newUser created:', newUser);
    const newProducts = createOrderDto.product;
    console.log('newProducts en contorller ', newProducts);
  }
}
