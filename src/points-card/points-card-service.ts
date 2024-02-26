import {PointsCardEntity} from "./points-card-entity";
import {v4 as uuid} from 'uuid';
import {PointsCardDto} from "./points-card-dto";
import {PointsCardRepo} from "./points-card-repo";
import inMemoryPointsCardRepoSingletonInstance from "./inmemory-points-card-repo";

export class PointsCardService {
    private readonly repo: PointsCardRepo;
    constructor(repo?: PointsCardRepo) {
        if (repo)
            this.repo = repo
        else
            this.repo = inMemoryPointsCardRepoSingletonInstance //TODO: add a test to document that is always used the same repo every new singleton instance method call (or api call)
    }

    generateId(): string {
        return uuid()
    }

    add(id: string, pointsCardDto: PointsCardDto): void {
        this.repo.save(PointsCardEntity.create(id, pointsCardDto))
    }

    get(id: string): PointsCardEntity | null {
        return this.repo.get(id)
    }

    addPoints(id: string): void {
        const pointsCard = this.get(id)
        if (pointsCard !== null) {
            pointsCard.addPoints()
            this.repo.save(pointsCard)
        }
    }

    subtractPoints(id: string) {
        const pointsCard = this.get(id)
        if (pointsCard === null)
            throw new Error("Points card not found") // TODO: discuss this. Should I do not throw this assuming that the command is call only if the points card exists or throw error or simply return? RISPOSTA: no, exceptional event should be exception. This is a command and we are validating the command with a guard

        pointsCard.subtractPoints()
        this.repo.save(pointsCard)
    }

    getPoints(id: string): number {
        const pointsCard = this.get(id)
        if (pointsCard === null)
            return 0

        return pointsCard.getPoints()
    }
}