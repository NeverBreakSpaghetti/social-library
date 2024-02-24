import {PointsCardRepo} from "./points-card-repo";
import {PointsCardEntity} from "./points-card-entity";

export class InMemoryPointsCardRepo extends PointsCardRepo {
    private pointsCards: PointsCardEntity[] = [];

    get(id: string): PointsCardEntity | null {
        return this.pointsCards.find(pointsCard => pointsCard['id'] === id) || null;
    }

    save(pointsCard: PointsCardEntity): void {
        if (!this.pointsCardExists(pointsCard)) {
            this.pointsCards.push(pointsCard)
            return
        }

        const index = this.findIndex(pointsCard);
        this.pointsCards[index] = pointsCard;
    }

    private findIndex(pointsCard: PointsCardEntity) {
        return this.pointsCards.findIndex(existingPointsCard => existingPointsCard['id'] === pointsCard['id'])
    }

    private pointsCardExists(pointsCard: PointsCardEntity) {
        return this.pointsCards.some(existingPointsCard => existingPointsCard['id'] === pointsCard['id'])
    }
}

const inMemoryPointsCardRepoSingletonInstance = new InMemoryPointsCardRepo();

export default inMemoryPointsCardRepoSingletonInstance;