import {  Controller, Get, UseFilters } from "@nestjs/common";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { defer } from "rxjs";
import FetchMasterAdapter from "src/application/master/adapters/fetch-master.adapter";
import { MasterCommandPatterns } from "src/infrastructure/constants/master/master-command-pattern";
import { ExceptionFilter } from "src/infrastructure/Exception-filter/exception-filter";


@Controller()
export class MasterController {
    constructor(
        private fetchMasterAdapter: FetchMasterAdapter,
    ) {
        console.log('master service controller created')
    }

    @UseFilters(new ExceptionFilter())
    @Get('/all')
    fetchMasterData() {
        console.log('Master service controller fetchMasterData method')
        throw new RpcException('tEST EXCEPTION FILTER fetchMasterData.');
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