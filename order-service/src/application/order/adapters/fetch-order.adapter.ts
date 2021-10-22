import { Inject, Injectable } from "@nestjs/common";
import { OrderModel } from "src/domian/order/models/order.model";
import { IOrderService } from "src/domian/order/ports/order.service";
import { IBaseAdapter } from "src/infrastructure/adapter-contract/base-adapter.adapter";
import { OrderSettingConstants } from "src/infrastructure/constants/order/order-settings";


@Injectable()
export default class FetchOrderAdapter implements IBaseAdapter<number, OrderModel> {
    constructor(@Inject(OrderSettingConstants.ORDER_SERVICE) private orderService: IOrderService) {
        console.log('FetchOrderAdapter created')
    }
    handle(): Promise<OrderModel[]> {
        return this.orderService.fetchOrder()
    }
}