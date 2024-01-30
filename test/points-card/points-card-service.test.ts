import {PointsCardRepo, PointsCardService} from "../../src/points-card/points-card-service";

describe('points card service', () => {
    let repoMock: PointsCardRepo

    beforeAll(() => {
        repoMock = {
            get: jest.fn(),
            save: jest.fn()
        }
    })

    describe('generateId', () => {
        it('should generate a new uuid', () => {
            const pointsCardService = new PointsCardService(repoMock);

            expect(pointsCardService.generateId()).toEqual(expect.any(String));
        });

        it('should generate different uuids', () => {
            const pointsCardService = new PointsCardService(repoMock);

            expect(pointsCardService.generateId()).not.toEqual(pointsCardService.generateId());
        });
    });

    describe('add', () => {
        it('should add the points card to the repo', () => {
            const pointsCardService = new PointsCardService(repoMock);
            const pointsCardDto = {name: 'GianniThePointsMaximiser'}

            pointsCardService.add('uuid', pointsCardDto);

            expect(repoMock.save).toHaveBeenCalledWith({id: 'uuid', name: 'GianniThePointsMaximiser'})
        });
    });
});