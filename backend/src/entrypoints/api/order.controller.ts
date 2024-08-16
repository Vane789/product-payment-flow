import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../../application/services/order.service';
import { PaymentService } from 'src/application/services/payment.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
  ) {}

  // @Post()
  // async createOrder(@Body() createOrderDto: Order) {
  //   // return this.orderService.createOrder(createOrderDto);
  // }

  @Post()
  async createOrder(@Body() createOrderDto: any): Promise<any> {
    const data = { recibido: 'ok' };
    console.log('Received data:', createOrderDto);
    const paymentData = createOrderDto.payment;
    console.log('paymentData ', paymentData);
    const newPayment = await this.paymentService.createPayment(paymentData);
    console.log('New payment created:', newPayment);
    // createOrderDto.payment = newPayment;
    // const newOrder = await this.orderService.createOrder(createOrderDto);
    // console.log('Order created:', newOrder);
    // return {
    //   message: 'Order and payment created successfully',
    //   order: newOrder,
    //   cardNumber: newPayment,
    // };
  }
}
