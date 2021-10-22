import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/infrastructure/configuration/config.service';
import { MasterSettingConstants } from 'src/infrastructure/constants/master/master-settings';

@Module({
    imports: [
        TypeOrmModule.forRoot(
            ConfigService
                .create()
                .ensureValues(
                    [
                        MasterSettingConstants.MASTER_POSTGRES_HOST,
                        MasterSettingConstants.MASTER_POSTGRES_PORT,
                        MasterSettingConstants.MASTER_POSTGRES_USERNAME,
                        MasterSettingConstants.MASTER_POSTGRES_PASSWORD,
                        MasterSettingConstants.MASTER_POSTGRES_DATABASE,
                        MasterSettingConstants.MASTER_ENTITIES_PATH,
                        MasterSettingConstants.MASTER_MIGRATION_TABLE_NAME,
                        MasterSettingConstants.MASTER_MIGRATIONS_FILE_PATH,
                        MasterSettingConstants.MASTER_MIGRATIONS_DIRECTORY
                    ]
                )
                .getTypeOrmConfig()
        )]
})
export class MasterDatabaseModule { };