import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from './infrastructure/configuration/config.service';
import { OrderModule} from './services/order/order.module';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule)
  await app.listen(ConfigService.create().getPort())
 
}
bootstrap();
