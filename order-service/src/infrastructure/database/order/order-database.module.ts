import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/core-domain/adapters/order/entities/order.entity';
import { ConfigService } from 'src/infrastructure/configuration/config.service';
import { OrderSettingConstants } from 'src/infrastructure/constants/order/order-settings';

@Module({
    imports: [
        TypeOrmModule.forRoot(
            ConfigService
                .create()
                .ensureValues(
                    [
                        OrderSettingConstants.ORDER_POSTGRES_HOST,
                        OrderSettingConstants.ORDER_POSTGRES_PORT,
                        OrderSettingConstants.ORDER_POSTGRES_USERNAME,
                        OrderSettingConstants.ORDER_POSTGRES_PASSWORD,
                        OrderSettingConstants.ORDER_POSTGRES_DATABASE,
                        OrderSettingConstants.ORDER_ENTITIES_PATH,
                        OrderSettingConstants.ORDER_MIGRATION_TABLE_NAME,
                        OrderSettingConstants.ORDER_MIGRATIONS_FILE_PATH,
                        OrderSettingConstants.ORDER_MIGRATIONS_DIRECTORY,
                        
                    ]
                )
                .getTypeOrmConfig()
        ),
        TypeOrmModule.forFeature([Orders])]
})
export class OrderDatabaseModule { };