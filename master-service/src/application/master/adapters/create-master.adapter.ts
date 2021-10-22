import { Inject, Injectable } from "@nestjs/common";
import { MasterModel } from "src/domian/master/models/master.model";
import { IMasterService } from "src/domian/master/ports/master.service";
import { IBaseAdapter } from "src/infrastructure/adapter-contract/base-adapter.adapter";
import { MasterSettingConstants } from "src/infrastructure/constants/master/master-settings";
//import { MasterSettingConstants } from "src/infrastructure/constants/master/master-settings";
import { CreateMasterCommand } from "../commnds/create-master.command";

@Injectable()
export class CreateMasterAdapter implements IBaseAdapter<CreateMasterCommand, MasterModel> {
    constructor(@Inject(MasterSettingConstants.MASTER_SERVICE) private masterService: IMasterService) {
        console.log('CreateMasterAdapter created')
    }

    async handle(master?: CreateMasterCommand): Promise<MasterModel> {
        return this.masterService.addMaster({ ...master })
    }
}