import { Controller, Get, HttpException, HttpStatus, NotFoundException, UseFilters } from "@nestjs/common";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { defer } from "rxjs";
import FetchMasterAdapter from "src/application/master/adapters/fetch-master.adapter";
import { MasterCommandPatterns } from "src/infrastructure/constants/master/master-command-pattern";
import { HttpExceptionFilter } from "src/infrastructure/Exception-filter/http.exception.filter";
import { WinstonLoggerService } from "src/infrastructure/logger/winston-logger.service";

@UseFilters(new HttpExceptionFilter())
@Controller()
export class MasterController {
    constructor(
        private fetchMasterAdapter: FetchMasterAdapter,private logger: WinstonLoggerService,
    ) {
        console.log('master service controller created')
        this.logger.setContext(MasterController.name);
    }


    @Get('/all')
    fetchMasterData() {
        console.log('Master service controller fetchMasterData method')
        this.logger.info('in fetchMasterData info', { jey: 'sekar' });
        this.logger.error('in fetchMasterData error', { jey: 'sekar' });
        this.logger.debug('in fetchMasterData debug', { jey: 'sekar' });
        this.logger.warn('in fetchMasterData warn', { jey: 'sekar' });

        throw new RpcException({
            status: HttpStatus.NOT_FOUND,
            errorMsg: '.rpc..Access to this site is forbidden',
        });
        throw new NotFoundException({
            status: HttpStatus.NOT_FOUND,
            errorMsg: '...Access to this site is forbidden',
        });

        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            errorMsg: 'Access to this site is forbidden'
        }, 403);
        return this.fetchMasterAdapter.handle()

    }
    @MessagePattern({ cmd: MasterCommandPatterns.FETCH_MASTER })
    fetchMaster() {
        console.log('Master MQ service controller fetchMaster method')
        return defer(() => {
            return this.fetchMasterAdapter.handle()
        })
    }

}