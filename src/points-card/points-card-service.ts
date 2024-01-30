import {PointsCardEntity} from "./points-card-entity";
import {v4 as uuid} from 'uuid';

export abstract class PointsCardRepo {
    abstract get(id: string): PointsCardEntity | null

    abstract save(pointsCard: PointsCardEntity): void
}

export class PointsCardService {
    constructor(private readonly repo: PointsCardRepo) {

    }

    generateId(): string {
        return uuid()
    }

    add(id: string, name: string): void {
        throw new Error('Method not implemented.')
    }

    get(id: string): PointsCardEntity {
        throw new Error('Method not implemented.')
    }
}