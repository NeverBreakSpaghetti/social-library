import {isValid} from "../../src/points-card/points-card-dto";

describe('points card dto', () => {
    describe('isValid', () => {
        it('should return false when is empty', () => {
            const pointsCardDtoToValidate = {}
            
            expect(isValid(pointsCardDtoToValidate)).toBe(false)
        });

        it('should return false when not contains name property', () => {
            const pointsCardDtoToValidate = {surname: 'Bombo'}

            expect(isValid(pointsCardDtoToValidate)).toBe(false)
        });

        it('should return true when contains name property', () => {
            const pointsCardDtoToValidate = {name: 'Gianni'}

            expect(isValid(pointsCardDtoToValidate)).toBe(true)
        });

        it('should return false when not contains only name property', () => {
            const pointsCardDtoToValidate = {name: 'Gianni', skills: 'drink beer +1 to strength'}

            expect(isValid(pointsCardDtoToValidate)).toBe(false)
        });
    });
})