import {isValid} from "../src/book/book-dto";

describe('bookDto', () => {
    describe('isValid', () => {
        it('should return false when its empty', () => {
            const emptyBook = {}

            expect(isValid(emptyBook)).toBeFalsy()
        });
        it('should return true when it contains only a title', () => {
            const book = {title: 'Gianni\'s knowledge pills'}

            expect(isValid(book)).toBeTruthy()
        });
        it('should return true when it contains a title and author', () => {
            const book = {title: 'Gianni\'s knowledge pills', author: 'Gianni'}

            expect(isValid(book)).toBeTruthy()
        });
        it('should return true when it contains a title and number of pages', () => {
            const book = {title: 'Gianni\'s knowledge pills', pages: 100000}

            expect(isValid(book)).toBeTruthy()
        });
        it('should return true when it contains a all the properties', () => {
            const book = {title: 'Gianni\'s knowledge pills', author: 'Gianni', pages: 100000}

            expect(isValid(book)).toBeTruthy()
        });
        it('should return false when it contains a not expected properties', () => {
            const book = {
                title: 'Gianni\'s knowledge pills',
                pages: 100000,
                notExpectedProperty: 'not expected property'
            }

            expect(isValid(book)).toBeFalsy()
        });
    });
});