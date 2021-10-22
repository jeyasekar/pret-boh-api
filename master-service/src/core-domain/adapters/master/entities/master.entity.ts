import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'master'
})
export class Masters {
    constructor() {
        console.log('Master entity created')
    }
    @PrimaryGeneratedColumn({
        name: 'masterid',
        type: 'integer',
    })
    masterId: number;

    @Column({
        name: 'mastername',
        type: 'character varying',
    })
    masterName: string;

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