export class OrderModel {
    constructor(public orderName?: string, public description?: string, public releaseDate?: string, public price?: number, public imageUrl?: string, public likes?: number, public orderId?: number) {
        console.log('order model created')
    }
}