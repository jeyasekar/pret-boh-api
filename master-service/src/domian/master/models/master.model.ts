export class MasterModel {
    constructor(public masterName?: string, public description?: string, public releaseDate?: string, public price?: number, public imageUrl?: string, public likes?: number, public masterId?: number) {
        console.log('master model created')
    }
}