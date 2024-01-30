import {PointsCardRepo, PointsCardService} from "../../src/points-card/points-card-service";

describe('points card service', () => {
    let repoMock: PointsCardRepo

    beforeAll(() => {
        repoMock = {
            get: jest.fn(),
            save: jest.fn()
        }
    })

    afterEach(() => {
      jest.resetAllMocks();
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

    describe('get', () => {
        it('should get the points card from the repo', () => {
            const pointsCardService = new PointsCardService(repoMock);
            repoMock.get = jest.fn().mockReturnValue({id: 'uuid', name: 'GianniThePointsMaximiser'})

            const pointsCard = pointsCardService.get('uuid');

            expect(repoMock.get).toHaveBeenCalledWith('uuid')
            expect(pointsCard).toEqual({id: 'uuid', name: 'GianniThePointsMaximiser'})
        });

        it('should return null when points card is not in repo', () => {
            const pointsCardService = new PointsCardService(repoMock);
            repoMock.get = jest.fn().mockReturnValue(null)

            const result = pointsCardService.get('notExistingUuid');

            expect(repoMock.get).toHaveBeenCalledWith('notExistingUuid')
            expect(result).toEqual(null)
        });
    });
});