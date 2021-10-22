import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderModel } from "src/domian/order/models/order.model";
import { IOrderService } from "src/domian/order/ports/order.service";
import { OrderMapper } from "src/infrastructure/mapper/order/order.mapper";
import { Repository } from "typeorm";
import { Optional } from "typescript-optional";
import { Orders } from "../entities/order.entity";

@Injectable()
export class OrderRepository implements IOrderService {
    constructor(@InjectRepository(Orders) private orderRepository: Repository<Orders>) {
        console.log('OrderRepository created')
    }
    async fetchOrder(): Promise<OrderModel[]> {
        const allOrders = await this.orderRepository.find()
        return OrderMapper.toDomains(allOrders)
    }
    async addOrder(order: OrderModel): Promise<OrderModel> {
        const added = await this.orderRepository.save({
            price: order.price,
            description: order.description,
            productName: order.orderName,
            imageUrl: order.imageUrl,
            releaseDate: order.releaseDate
        })
        return OrderMapper.toDomain(added).get()
    }
   
}