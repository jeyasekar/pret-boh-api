import { Orders } from "src/core-domain/adapters/order/entities/order.entity"
import { OrderModel } from "src/domian/order/models/order.model"
import { Optional } from "typescript-optional"

export class OrderMapper {
    static toDomain(repoEntity: Orders): Optional<OrderModel> {
        if (!repoEntity) {
            return Optional.empty<OrderModel>()
        }

        const orderModel: OrderModel = new OrderModel(
            repoEntity.orderName,
            repoEntity.description,
            repoEntity.releaseDate,
            repoEntity.price,
            repoEntity.imageUrl,
            repoEntity.likes,
            repoEntity.orderId
        )

        return Optional.of(orderModel)
    }
    static toDomains(repoEntities: Orders[]): OrderModel[] {
        const productModels = new Array<OrderModel>()
        repoEntities.forEach(
            re => {
                const productModel = this.toDomain(re)
                productModels.push(productModel.get())
            }
        )
        return productModels
    }
}