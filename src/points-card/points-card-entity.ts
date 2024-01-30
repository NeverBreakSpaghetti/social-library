import {PointsCardDto} from "./points-card-dto";
import {AssociateRole, NewComerRole} from "./associate-role";

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