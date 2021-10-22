import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
       // url: 'redis://localhost:6379',
        url: '//redis-17939.c1.asia-northeast1-1.gce.cloud.redislabs.com:17939',
        password:'iY78kOVxQbAFTHYnBxEYNzIDmc9SUfIj'
      },
    },
  );
  await app.listen(() => console.log('Redis microservice is listening'));
}
bootstrap();
