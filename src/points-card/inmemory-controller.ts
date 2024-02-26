import {PointsCardService} from "./points-card-service";

export class PointsCardInMemoryController {
    private pointsCardService: PointsCardService = new PointsCardService();

    addPoints(pointsCardId: string): void {
        this.pointsCardService.addPoints(pointsCardId);
    }

    subtractPoints(pointsCardId: string): void {
        this.pointsCardService.subtractPoints(pointsCardId);
    }
}