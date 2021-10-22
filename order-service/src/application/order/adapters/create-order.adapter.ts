import { Inject, Injectable } from "@nestjs/common";
import { OrderModel } from "src/domian/order/models/order.model";
import { IOrderService } from "src/domian/order/ports/order.service";
import { IBaseAdapter } from "src/infrastructure/adapter-contract/base-adapter.adapter";
import { OrderSettingConstants } from "src/infrastructure/constants/order/order-settings";
import { CreateOrderCommand } from "../commnds/create-order.command";

@Injectable()
export class CreateOrderAdapter implements IBaseAdapter<CreateOrderCommand, OrderModel> {
    constructor(@Inject(OrderSettingConstants.ORDER_SERVICE) private orderService: IOrderService) {
        console.log('CreateOrderAdapter created')
    }

    async handle(order?: CreateOrderCommand): Promise<OrderModel> {
        return this.orderService.addOrder({ ...order })
    }
}