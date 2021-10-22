import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseType } from 'typeorm'
import * as dotenv from 'dotenv'
import { OrderSettingConstants } from '../constants/order/order-settings';


dotenv.config()
type envConfigType = {
    [key: string]: string | undefined
}

export class ConfigService {
    private static svc: ConfigService;
    static create() {
        if (!this.svc) {
            this.svc = new ConfigService(process.env)
        }
        return this.svc
    }
    private constructor(private env: envConfigType) {
        console.log('svc created')
    }
    private getValue(key: string, throwOnMissing = true): string {
       // console.log('+++++this.env',this.env)
        const value = this.env[key]
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`)
        }

        return value
    }
    public getTypeOrmConfig(): TypeOrmModuleOptions {
        const dbType = this.getValue(OrderSettingConstants.ORDER_DATABASE_TYPE)
        let type1: DatabaseType = 'sqlite';
        switch (dbType) {
            case 'postgres':
                type1 = 'postgres'
                break;
            case 'mysql':
                type1 = 'mysql'
                break;
            //...other possibilities
            default:
                break;
        }

        const options: TypeOrmModuleOptions = {
            type: type1,
            host: this.getValue(OrderSettingConstants.ORDER_POSTGRES_HOST),
            port: parseInt(this.getValue(OrderSettingConstants.ORDER_POSTGRES_PORT)),
            username: this.getValue(OrderSettingConstants.ORDER_POSTGRES_USERNAME),
            password: this.getValue(OrderSettingConstants.ORDER_POSTGRES_PASSWORD),
            database: this.getValue(OrderSettingConstants.ORDER_POSTGRES_DATABASE),
            entities: [this.getValue(OrderSettingConstants.ORDER_ENTITIES_PATH)],
            migrationsTableName: this.getValue(OrderSettingConstants.ORDER_MIGRATION_TABLE_NAME),
            migrations: [this.getValue(OrderSettingConstants.ORDER_MIGRATIONS_FILE_PATH)],
            synchronize: true,
            cli: {
                migrationsDir: this.getValue(OrderSettingConstants.ORDER_MIGRATIONS_DIRECTORY)
            }
        }
        console.log(options)
        return options
    }
    public getPort() {
        return this.getValue('ORDER_SERVICE_PORT', true)
    }
    public isProduction() {
        const mode = this.getValue('MODE', false)
        return mode != 'DEV'
    }
    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true))
        return this
    }
}
