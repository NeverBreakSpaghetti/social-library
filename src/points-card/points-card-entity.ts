import {PointsCardDto} from "./points-card-dto";

export class PointsCardEntity {
    constructor(private readonly id: string, private name: string) {
    }

    static create = (id: string, pointsCardDto: PointsCardDto) => {
        return new PointsCardEntity(id, pointsCardDto.name);
    }

    public addPoints() {
        //TODO: implement method
    }
}