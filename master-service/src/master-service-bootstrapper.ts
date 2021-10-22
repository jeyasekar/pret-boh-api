import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from './infrastructure/configuration/config.service';
import { MasterSettingConstants } from './infrastructure/constants/master/master-settings';
import { MasterModule } from './services/master/master.module';

async function bootstrap() {
  const app = await NestFactory.create(MasterModule)
    
  
  app.connectMicroservice({
    name: MasterSettingConstants.MASTER_MQ_CLIENT_PROXY,
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://mgctrdee:bGBkCrxIP4MZbUQuC5-SAACtjLt0WqvM@mustang.rmq.cloudamqp.com/mgctrdee'],
      queue: 'products_service_queue',
      queueOptions: {
        durable: false
      }
    }
  })
  await app.startAllMicroservices();
  await app.listen(ConfigService.create().getPort())

}
bootstrap();
