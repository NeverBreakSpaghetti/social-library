import {PointsCardEntity} from "./points-card-entity";

export abstract class PointsCardRepo {
    abstract get(id: string): PointsCardEntity | null

    abstract save(pointsCard: PointsCardEntity): void
}