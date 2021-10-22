import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'first_service' })
  getData(data: string): string {
    return data + ' - Jeys redis microservice!';
  }
}
