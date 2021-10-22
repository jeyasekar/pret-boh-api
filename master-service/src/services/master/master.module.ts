import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import FetchMasterAdapter from 'src/application/master/adapters/fetch-master.adapter';
import FetchProductsAdapter from 'src/application/master/adapters/fetch-master.adapter';
import { Masters } from 'src/core-domain/adapters/master/entities/master.entity';
import { MasterRepository } from 'src/core-domain/adapters/master/repositories/master.repository';
import { MasterSettingConstants } from 'src/infrastructure/constants/master/master-settings';
import { MasterDatabaseModule } from 'src/infrastructure/database/master/master-database.module';
import { ExceptionFilter } from 'src/infrastructure/Exception-filter/exception-filter';
import { MasterController } from './master.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: MasterSettingConstants.MASTER_MQ_CLIENT_PROXY,
                transport: Transport.RMQ,
                options: {
                    urls: ['amqps://mgctrdee:bGBkCrxIP4MZbUQuC5-SAACtjLt0WqvM@mustang.rmq.cloudamqp.com/mgctrdee'],
                    queue: 'products_service_queue',
                    queueOptions: {
                        durable: false
                    }
                }
            },
        ]),
        MasterDatabaseModule,
        TypeOrmModule.forFeature([Masters])
    ],
    controllers: [MasterController],
    providers: [
        FetchMasterAdapter,
        ExceptionFilter,
        {
            provide: MasterSettingConstants.MASTER_SERVICE,
            useClass: MasterRepository
        }
    ],
}) 
export class MasterModule {
    constructor() {
        console.log('MasterModule created')
        console.log('Logger Application created')
    }
};