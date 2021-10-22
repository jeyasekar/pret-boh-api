import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MasterModel } from "src/domian/master/models/master.model";
import { IMasterService } from "src/domian/master/ports/master.service";
import { MasterMapper } from "src/infrastructure/mapper/master/master.mapper";
import { Repository } from "typeorm";
import { Optional } from "typescript-optional";
import { Masters } from "../entities/master.entity";

@Injectable()
export class MasterRepository implements IMasterService {

    constructor(@InjectRepository(Masters) private masterRepository: Repository<Masters>) {
        console.log('MasterRepository created')
    }
    async fetchMaster(): Promise<MasterModel[]> {
        const allMaster = await this.masterRepository.find()
        return MasterMapper.toDomains(allMaster)
    }

    async addMaster(master: MasterModel): Promise<MasterModel> {
        const added = await this.masterRepository.save({
            price: master.price,
            description: master.description,
            masterName: master.masterName,
            imageUrl: master.imageUrl,
            releaseDate: master.releaseDate
        })
        return MasterMapper.toDomain(added).get()
    }

    
   
    }