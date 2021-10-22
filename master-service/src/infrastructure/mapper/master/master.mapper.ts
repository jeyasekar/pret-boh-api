import { Masters } from "src/core-domain/adapters/master/entities/master.entity"
import { MasterModel } from "src/domian/master/models/master.model"
import { Optional } from "typescript-optional"

export class MasterMapper {
    static toDomain(repoEntity: Masters): Optional<MasterModel> {
        if (!repoEntity) {
            return Optional.empty<MasterModel>()
        }

        const masterModel: MasterModel = new MasterModel(
            repoEntity.masterName,
            repoEntity.description,
            repoEntity.releaseDate,
            repoEntity.price,
            repoEntity.imageUrl,
            repoEntity.likes,
            repoEntity.masterId
        )

        return Optional.of(masterModel)
    }
    static toDomains(repoEntities: Masters[]): MasterModel[] {
        const masterModels = new Array<MasterModel>()
        repoEntities.forEach(
            re => {
                const masterModel = this.toDomain(re)
                masterModels.push(masterModel.get())
            }
        )
        return masterModels
    }
}