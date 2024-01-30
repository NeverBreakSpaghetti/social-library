import {PointsCardEntity} from "./points-card-controller";

export interface ResponsePointsCardDto {
    id: string,
    name: string
}

export const mapPointsCardToResponsePointsCardDto = (pointsCard: PointsCardEntity): ResponsePointsCardDto => {
    return {id: pointsCard['id'], name: pointsCard['name']}
};