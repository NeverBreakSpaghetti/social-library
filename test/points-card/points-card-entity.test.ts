import {PointsCardEntity} from "../../src/points-card/points-card-entity";

describe('points card entity', () => {
    let pointsCardEntity: PointsCardEntity

    beforeEach(() => {
        pointsCardEntity = new PointsCardEntity('uuid', 'GianniThePointsMaximiser');
    })

    describe('when creating a new card', () => {
        it('should have 0 points', () => {
            expect(pointsCardEntity.getPoints()).toEqual(0);
        });

        it('should have New comer role', () => {
            expect(pointsCardEntity.getRole()).toEqual('New comer');
        })
    });

    describe('when adding points', () => {
        it('should add 1 point when role is New comer', () => {
            pointsCardEntity.addPoints();

            expect(pointsCardEntity.getRole()).toEqual('New comer');
            expect(pointsCardEntity.getPoints()).toEqual(1);
        });

        it('should accumulate points', () => {
            pointsCardEntity.addPoints();
            pointsCardEntity.addPoints();

            expect(pointsCardEntity.getRole()).toEqual('New comer');
            expect(pointsCardEntity.getPoints()).toEqual(2);
        });
    });

    describe('when subtracting points', () => {
        it('should return an error when points balance is 0', () => {
            expect(()=>pointsCardEntity.subtractPoints()).toThrow('Points insufficient')
        });

        it('should remove 2 point when role is New comer', () => {
            pointsCardEntity.addPoints()
            pointsCardEntity.addPoints();
            expect(pointsCardEntity.getPoints()).toEqual(2);

            pointsCardEntity.subtractPoints();

            expect(pointsCardEntity.getRole()).toEqual('New comer');
            expect(pointsCardEntity.getPoints()).toEqual(0);
        });

        it('should remove points multiple times', () => {
            pointsCardEntity.addPoints();
            pointsCardEntity.addPoints();
            pointsCardEntity.addPoints()
            pointsCardEntity.addPoints();
            expect(pointsCardEntity.getPoints()).toEqual(4);

            pointsCardEntity.subtractPoints();
            expect(pointsCardEntity.getPoints()).toEqual(2);

            pointsCardEntity.subtractPoints();
            expect(pointsCardEntity.getPoints()).toEqual(0);
        });
    });

});