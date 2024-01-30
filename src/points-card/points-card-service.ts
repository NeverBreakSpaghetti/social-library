import {PointsCardEntity} from "./points-card-entity";
import {v4 as uuid} from 'uuid';
import {PointsCardDto} from "./points-card-dto";
import {PointsCardRepo} from "./points-card-repo";

export class PointsCardService {
    constructor(private readonly repo: PointsCardRepo) {

    }

    generateId(): string {
        return uuid()
    }

    add(id: string, pointsCardDto: PointsCardDto): void {
        this.repo.save(PointsCardEntity.create(id, pointsCardDto))
    }

    get(id: string): PointsCardEntity | null {
        return this.repo.get(id)
    }
}