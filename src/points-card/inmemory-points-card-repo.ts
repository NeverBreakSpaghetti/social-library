import {PointsCardRepo} from "./points-card-repo";
import {PointsCardEntity} from "./points-card-entity";

export class InMemoryPointsCardRepo extends PointsCardRepo{
    private pointsCards: PointsCardEntity[] = [];
    get(id: string): PointsCardEntity | null {
        return this.pointsCards.find(pointsCard => pointsCard['id'] === id) || null;
    }

    save(pointsCard: PointsCardEntity): void {
        this.pointsCards.push(pointsCard)
    }

}