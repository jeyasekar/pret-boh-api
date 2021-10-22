import { Optional } from "typescript-optional";
import { MasterModel } from "../models/master.model";

export interface IMasterService {
    fetchMaster(): Promise<MasterModel[]>;

    addMaster(master: MasterModel): Promise<MasterModel>;

}