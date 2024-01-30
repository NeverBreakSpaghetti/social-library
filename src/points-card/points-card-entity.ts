import {PointsCardDto} from "./points-card-dto";

export abstract class AssociateRole {
    abstract getTitle(): string;
    abstract getIncreasingPoints(): number;
}

class NewComerRole extends AssociateRole {
    getTitle(): string {
        return "New comer"
    }

    getIncreasingPoints(): number {
        return 1
    }
}

export class PointsCardEntity {
    private points: number = 0;
    private role: AssociateRole = new NewComerRole()
    constructor(private readonly id: string, private readonly name: string) {}

    static create = (id: string, pointsCardDto: PointsCardDto) => {
        return new PointsCardEntity(id, pointsCardDto.name);
    }

    public addPoints() {
        this.points += this.role.getIncreasingPoints()
    }

    getPoints(): number {
        return this.points
    }

    getRole(): string {
        return this.role.getTitle()
    }
}