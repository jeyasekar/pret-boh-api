import { Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { CreateOrderAdapter } from "src/application/order/adapters/create-order.adapter";
import FetchOrderAdapter from "src/application/order/adapters/fetch-order.adapter";
import { CreateOrderCommand } from "src/application/order/commnds/create-order.command";
import { OrderExtInvokerService } from "./order-ext-invoker.service";


@Controller()
export class OrderController {
    constructor(
        private createOrderAdapter: CreateOrderAdapter,
        private fetchOrderAdapter: FetchOrderAdapter,
        private exInvoker: OrderExtInvokerService,
    ) {
        console.log('order service controller created')
    }

    @Post('/add')
    create(@Body() order: CreateOrderCommand) {
        console.log('products service controller create method')
        console.log(order)
        return this.createOrderAdapter.handle(order)
    }

    @Get('/all')
    fetchOrder() {
        console.log('order service controller fetchOrder method')

         return this.fetchOrderAdapter.handle();

    }

    @Get('/redis')
    fetchRedisData() {
        console.log('order service controller fetchOrder method')
        return this.exInvoker.fetchRedisData();
         
    }

    @Get('/masterq')
    fetchMQData() {
        console.log('order service controller masterq method')
        return this.exInvoker.fetchOrders();
    }
}