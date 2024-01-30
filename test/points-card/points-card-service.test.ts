import {PointsCardRepo, PointsCardService} from "../../src/points-card/points-card-service";

describe('points card service', () => {
    let repoMock: PointsCardRepo
    let pointsCardService: PointsCardService

    beforeAll(() => {
        repoMock = {
            get: jest.fn(),
            save: jest.fn()
        }
    })

    beforeEach(() => {
        pointsCardService = new PointsCardService(repoMock);
    })

    afterEach(() => {
      jest.resetAllMocks();
    })

    describe('generateId', () => {
        it('should generate a new uuid', () => {
            expect(pointsCardService.generateId()).toEqual(expect.any(String));
        });

        it('should generate different uuids', () => {
            expect(pointsCardService.generateId()).not.toEqual(pointsCardService.generateId());
        });
    });

    describe('add', () => {
        it('should add the points card to the repo', () => {
            const pointsCardDto = {name: 'GianniThePointsMaximiser'}

            pointsCardService.add('uuid', pointsCardDto);

            expect(repoMock.save).toHaveBeenCalledWith({id: 'uuid', name: 'GianniThePointsMaximiser'})
        });
    });

    describe('get', () => {
        it('should get the points card from the repo', () => {
            repoMock.get = jest.fn().mockReturnValue({id: 'uuid', name: 'GianniThePointsMaximiser'})

            const pointsCard = pointsCardService.get('uuid');

            expect(repoMock.get).toHaveBeenCalledWith('uuid')
            expect(pointsCard).toEqual({id: 'uuid', name: 'GianniThePointsMaximiser'})
        });

        it('should return null when points card is not in repo', () => {
            repoMock.get = jest.fn().mockReturnValue(null)

            const result = pointsCardService.get('notExistingUuid');

            expect(repoMock.get).toHaveBeenCalledWith('notExistingUuid')
            expect(result).toEqual(null)
        });
    });
});