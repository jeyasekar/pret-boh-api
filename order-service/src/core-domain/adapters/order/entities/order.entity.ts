import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'order'
})
export class Orders {
    constructor() {
        console.log('Order entity created')
    }
    @PrimaryGeneratedColumn({
        name: 'orderId',
        type: 'integer',
    })
    orderId: number;

    @Column({
        name: 'orderName',
        type: 'character varying',
    })
    orderName: string;

    @Column({
        name: 'description',
        type: 'character varying',
    })
    description: string;

    @Column({
        name: 'releasedon',
        type: 'character varying',
    })
    releaseDate: string;

    @Column({
        name: 'likes',
        type: 'integer',
    })
    likes: number;

    @Column({
        name: 'price',
        type: 'numeric',
    })
    price: number;

    @Column({
        name: 'imagepath',
        type: 'character varying',
    })
    imageUrl: string;
}