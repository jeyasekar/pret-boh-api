import { Inject, Injectable } from "@nestjs/common";
import { MasterModel } from "src/domian/master/models/master.model";
import { IMasterService } from "src/domian/master/ports/master.service";
import { IBaseAdapter } from "src/infrastructure/adapter-contract/base-adapter.adapter";
import { MasterSettingConstants } from "src/infrastructure/constants/master/master-settings";
//import { MasterSettingConstants } from "src/infrastructure/constants/master/master-settings";


@Injectable()
export default class FetchMasterAdapter implements IBaseAdapter<number, MasterModel> {
    constructor(@Inject(MasterSettingConstants.MASTER_SERVICE) private masterService: IMasterService) {
        console.log('FetchMasterAdapter created')
    }
    handle(): Promise<MasterModel[]> {
        return this.masterService.fetchMaster()
    }
}