import {isValid} from "../../src/auth/user-dto";

describe('userDto', () => {
    describe('isValid', () => {
        it('should return false when its empty', () => {
            const emptyUser = {}

            expect(isValid(emptyUser)).toBeFalsy()
        });

        it('should return true when contains user and passwordHash', () => {
            const user = {user: "Gianni", passwordHash: "bisteccaHashata"}

            expect(isValid(user)).toBeTruthy()
        });

        it('should return false when it contains a not expected properties', () => {
            const user = {
                user: "Gianni",
                passwordHash: "bisteccaHashata",
                notExpectedProperty: "not expected property"
            }

            expect(isValid(user)).toBeFalsy()
        });

        it('should return false when it contains less only one property', () => {
            const user = {user: "Gianni"}

            expect(isValid(user)).toBeFalsy()
        });

        it('should return false when user property is empty', () => {
            const user = {user:"", passwordHash: "bisteccaHashata"}

            expect(isValid(user)).toBeFalsy()
        });

        it('should return false when passwordHash property is empty', () => {
            const user = {user: "Gianni", passwordHash: ""}

            expect(isValid(user)).toBeFalsy()
        });
    });
});