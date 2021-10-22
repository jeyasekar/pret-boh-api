export class CreateOrderCommand {
    orderName: string;
    description: string;
    price: number;
    imageUrl: string;
    releaseDate: string;
}

/*
import { IsNumber, IsString } from "class-validator";

export class CreateProductCommand {
    @IsString()
    productName: string;

    @IsString()
    description: string;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2
    })
    price: number;

    @IsString()
    imageUrl: string;

    @IsString()
    releaseDate: string;
}
*/