import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
    constructor(){
        console.log('init exception filter')
    }
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
      console.log('inside exception filter')
    return throwError(exception.getError());
  }
}