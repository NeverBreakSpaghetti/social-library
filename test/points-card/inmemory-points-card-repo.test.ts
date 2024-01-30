import {InMemoryPointsCardRepo} from "../../src/points-card/inmemory-points-card-repo";
import {PointsCardEntity} from "../../src/points-card/points-card-entity";

describe('in memory points card repo', () => {
    let pointsCardRepo: InMemoryPointsCardRepo;

    beforeEach(() => {
        pointsCardRepo = new InMemoryPointsCardRepo();
    })

    describe('get', () => {
        it('should return null when points card is not in repo', () => {
            const result = pointsCardRepo.get('notExistingUuid');

            expect(result).toEqual(null);
        });

        it('should return the points card when it is in repo', () => {
            const existingPointsCard = PointsCardEntity.create('uuid', {name: 'GianniThePointsMaximiser'})
            pointsCardRepo['pointsCards'] = [existingPointsCard]

            const result = pointsCardRepo.get('uuid');

            expect(result).toEqual(existingPointsCard);
        })
    });

    describe('save', () => {
            it('should save the points card', () => {
            const pointsCard = PointsCardEntity.create('uuid', {name: 'GianniThePointsMaximiser'})

            pointsCardRepo.save(pointsCard)

            expect(pointsCardRepo['pointsCards']).toEqual([pointsCard])
        })
    })
});