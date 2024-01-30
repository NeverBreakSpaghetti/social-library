import {PointsCardDto} from "./points-card-dto";

export abstract class AssociateRole {
    abstract getTitle(): string;
    abstract getIncreasingPoints(): number;
    abstract getDecreasingPoints(): number;
}

class NewComerRole extends AssociateRole {
    getTitle(): string {
        return "New comer"
    }

    getIncreasingPoints(): number {
        return 1
    }

    getDecreasingPoints(): number {
        return 2;
    }
}

export class PointsCardEntity {
    private points: number = 0;
    private role: AssociateRole = new NewComerRole()
    constructor(private readonly id: string, private readonly name: string) {}

    static create = (id: string, pointsCardDto: PointsCardDto) => {
        return new PointsCardEntity(id, pointsCardDto.name);
    }

    addPoints() {
        this.points += this.role.getIncreasingPoints()
    }

    subtractPoints() {
        const pointsToSubtract = this.role.getDecreasingPoints()
        if (this.points < pointsToSubtract) {
            throw new Error("Points insufficient")
        }

        this.points -= pointsToSubtract
    }

    getPoints(): number {
        return this.points
    }

    getRole(): string {
        return this.role.getTitle()
    }
}