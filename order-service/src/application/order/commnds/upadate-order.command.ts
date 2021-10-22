export class UpdateOrderCommand {
    orderId: number;
    orderName: string;
    description: string;
    price: number;
    imageUrl: string;
    releaseDate: string;
    likes: number;
}

/*
import { IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateProductCommand {

    @IsOptional()
    @IsString()
    productName: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 2
    })
    price: number;

    @IsOptional()
    @IsString()
    imageUrl: string;

    @IsOptional()
    @IsString()
    releaseDate: string;

    @IsOptional()
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    })
    likes:number;
}
*/