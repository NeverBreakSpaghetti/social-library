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
});