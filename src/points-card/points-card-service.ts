import {PointsCardEntity} from "./points-card-entity";

export class PointsCardService {
    generateId() {
        return '0'
    }

    add(id: string, name: string) {
        throw new Error('Method not implemented.')
    }

    get(id: string): PointsCardEntity {
        throw new Error('Method not implemented.')
    }
}