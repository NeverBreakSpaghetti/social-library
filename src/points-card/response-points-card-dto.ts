import {PointsCardEntity} from "./points-card-entity";

export interface ResponsePointsCardDto {
    id: string,
    name: string
    totalPoints: number
}

export const mapPointsCardToResponsePointsCardDto = (pointsCard: PointsCardEntity): ResponsePointsCardDto => {
    return {id: pointsCard['id'], name: pointsCard['name'], totalPoints: pointsCard['points']}
};