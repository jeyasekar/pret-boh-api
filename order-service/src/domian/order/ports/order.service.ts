import { Optional } from "typescript-optional";
import { OrderModel } from "../models/order.model";

export interface IOrderService {
    fetchOrder(): Promise<OrderModel[]>;

    addOrder(order: OrderModel): Promise<OrderModel>;

}