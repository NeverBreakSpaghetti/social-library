import {PointsCardInMemoryController} from "../points-card/inmemory-controller";


export class PointsCardGateway{
    private readonly pointsCardInMemoryController: PointsCardInMemoryController = new PointsCardInMemoryController();

    addPoints(pointsCardId: string): void {
        this.pointsCardInMemoryController.addPoints(pointsCardId);
    }

    subtractPoints(pointsCardId: string): void {
        this.pointsCardInMemoryController.subtractPoints(pointsCardId);
    }
}