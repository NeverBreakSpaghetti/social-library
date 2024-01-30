import {PointsCardService} from "../../src/points-card/points-card-service";
import {PointsCardRepo} from "../../src/points-card/points-card-repo";
import {PointsCardEntity} from "../../src/points-card/points-card-entity";

jest.mock('../../src/points-card/points-card-entity')

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
            jest.spyOn(PointsCardEntity, 'create').mockReturnValue({id: 'uuid', name: 'GianniThePointsMaximiser'} as unknown as PointsCardEntity)

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

    describe('addPoints', () => {
        it('should add points when points card exists', () => {
            const pointsCardEntity = new PointsCardEntity('uuid', 'GianniThePointsMaximiser')
            repoMock.get = jest.fn().mockReturnValue(pointsCardEntity)

            pointsCardService.addPoints('uuid');

            expect(repoMock.get).toHaveBeenCalledWith('uuid')
            expect(PointsCardEntity.prototype.addPoints).toHaveBeenCalled()
        });

        it('should not add points when points card not exists', () => {
            repoMock.get = jest.fn().mockReturnValue(null)

            pointsCardService.addPoints('uuid');

            expect(repoMock.get).toHaveBeenCalledWith('uuid')
            expect(PointsCardEntity.prototype.addPoints).not.toHaveBeenCalled()
        });

        it('should update the repo when points are added', () => {
            const pointsCardEntity = new PointsCardEntity('uuid', 'GianniThePointsMaximiser')
            repoMock.get = jest.fn().mockReturnValue(pointsCardEntity)

            pointsCardService.addPoints('uuid');

            expect(repoMock.save).toHaveBeenCalledWith(pointsCardEntity)
        });
    });

    describe('subtractPoints', () => {
        it('should subtract points when points card exists with sufficient points', () => {
            const pointsCardEntity = new PointsCardEntity('uuid', 'GianniThePointsMinimiser')
            repoMock.get = jest.fn().mockReturnValue(pointsCardEntity)
            pointsCardService.addPoints('uuid');
            pointsCardService.addPoints('uuid');

            pointsCardService.subtractPoints('uuid');

            expect(repoMock.get).toHaveBeenCalledTimes(3)
            expect(PointsCardEntity.prototype.subtractPoints).toHaveBeenCalled()
        });

        it('should update the repo when points are subtracted', () => {
            const pointsCardEntity = new PointsCardEntity('uuid', 'GianniThePointsMinimiser')
            repoMock.get = jest.fn().mockReturnValue(pointsCardEntity)
            pointsCardService.addPoints('uuid');
            pointsCardService.addPoints('uuid');

            pointsCardService.subtractPoints('uuid');

            expect(repoMock.save).toHaveBeenCalledTimes(3)
        });

        it('should throw an error when points are not sufficient and not update repo', () => {
            PointsCardEntity.prototype.subtractPoints = jest.fn().mockImplementation(() => {throw new Error('Points insufficient')})
            const pointsCardEntity = new PointsCardEntity('uuid', 'GianniThePointsMinimiser')
            repoMock.get = jest.fn().mockReturnValue(pointsCardEntity)

            expect(()=> pointsCardService.subtractPoints('uuid')).toThrow('Points insufficient')
            expect(repoMock.get).toHaveBeenCalledWith('uuid')
            expect(repoMock.save).not.toHaveBeenCalled()
        });

        it('should throw an error when points card not exists', () => {
            repoMock.get = jest.fn().mockReturnValue(null)

            expect(()=> pointsCardService.subtractPoints('uuid')).toThrow('Points card not found')
            expect(repoMock.get).toHaveBeenCalledWith('uuid')
        });
    });
});