import Library from "../src/library";
import {BookDto} from "../src/bookDto";

describe('Library', () => {
    describe('add', () => {
        it('should accept a bookDto ad input', () => {
            const library = new Library();
            const bookDto: BookDto = {title: "Le avventure di Gianni in montagna" }

            expect(()=>library.add(bookDto)).not.toThrow();
        });

        it('should throw an error when input has not title', () => {
            const library = new Library();
            const otherInput = {title: "" }

            expect(()=>library.add(otherInput)).toThrow('Book not valid');
        });
    });
});