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

    addPoints(id: string): void {
        const pointsCard = this.get(id)
        if (pointsCard !== null) {
            pointsCard.addPoints()
            this.repo.save(pointsCard)
        }
    }

    subtractPoints(id: string) {
        const pointsCard = this.get(id)
        if (pointsCard === null)
            throw new Error("Points card not found")

        pointsCard.subtractPoints() //should throw error when points insufficient
        this.repo.save(pointsCard)
    }
}