import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateOrderCommand } from "src/application/order/commnds/create-order.command";
import { UpdateOrderCommand } from "src/application/order/commnds/upadate-order.command";
import { OrderModel } from "src/domian/order/models/order.model";
import { OrderCommandPatterns } from "src/infrastructure/constants/order/order-command-pattern";
import { OrderSettingConstants } from "src/infrastructure/constants/order/order-settings";

@Injectable()
export class OrderExtInvokerService {
    constructor(
        @Inject(OrderSettingConstants.MASTER_MQ_CLIENT_PROXY) private productsClient: ClientProxy,
        
        @Inject('REDIS_SERVICE') private readonly redisClient: ClientProxy,) {
        console.log('OrderExtInvokerService created')
    }
    fetchOrders() {
        console.log('inside service')
        return this.productsClient.send<OrderModel[]>(
            { cmd: OrderCommandPatterns.FETCH_ORDER }, {})
    }

    fetchRedisData() {
        console.log('service controller fetchOrder method')

        return this.redisClient.send<string>(
            { cmd: 'first_service' },
            'Message from',
          );

    }
}