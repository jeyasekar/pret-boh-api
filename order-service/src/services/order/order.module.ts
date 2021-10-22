import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateOrderAdapter } from 'src/application/order/adapters/create-order.adapter';
import FetchOrderAdapter from 'src/application/order/adapters/fetch-order.adapter';
import { Orders } from 'src/core-domain/adapters/order/entities/order.entity';
import { OrderRepository } from 'src/core-domain/adapters/order/repositories/order.repository';
import { OrderSettingConstants } from 'src/infrastructure/constants/order/order-settings';
import { OrderDatabaseModule } from 'src/infrastructure/database/order/order-database.module';
import { OrderExtInvokerService } from './order-ext-invoker.service';
import { OrderController } from './order.controller';

@Module({
    imports: [
        ClientsModule.register([{
            name: 'REDIS_SERVICE',
            transport: Transport.REDIS,
            options: {
                url: '//redis-17939.c1.asia-northeast1-1.gce.cloud.redislabs.com:17939',
                password: 'iY78kOVxQbAFTHYnBxEYNzIDmc9SUfIj'
            },
        },

        {
            name: OrderSettingConstants.MASTER_MQ_CLIENT_PROXY,
            transport: Transport.RMQ,
            options: {
                urls: ['amqps://mgctrdee:bGBkCrxIP4MZbUQuC5-SAACtjLt0WqvM@mustang.rmq.cloudamqp.com/mgctrdee'],
                queue: 'order_service_queue',
                queueOptions: {
                    durable: false
                }
            }
        },

        ]),
        OrderDatabaseModule,
        TypeOrmModule.forFeature([Orders])
    ],
    // exports: [OrderRepository],


    controllers: [OrderController],
    providers: [
        CreateOrderAdapter,
        FetchOrderAdapter,
        OrderExtInvokerService,
        
        {
            provide: OrderSettingConstants.ORDER_SERVICE,
            useClass: OrderRepository
        }
    ],
})
export class OrderModule {
    constructor() {
        console.log('OrderModule created');
    }
};