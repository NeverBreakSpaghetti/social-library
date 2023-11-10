import Library, {Repo} from "../src/library";
import {BookDto} from "../src/bookDto";

let repoMock: Repo
describe('Library', () => {
    beforeAll(() => {
        repoMock = {
            get: jest.fn(),
            save: jest.fn().mockReturnValue(1)
        }
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('add', () => {
        it('should accept a bookDto ad input', () => {
            const library = new Library(repoMock);
            const bookDto: BookDto = {title: "Le avventure di Gianni in montagna" }

            expect(()=>library.add(bookDto)).not.toThrow();
        });

        it('should throw an error when input has not title', () => {
            const library = new Library(repoMock);
            const otherInput = {title: "" }

            expect(()=>library.add(otherInput)).toThrow('Book not valid');
        });

        it('should save the book', () => {
            const library = new Library(repoMock);
            const bookDto: BookDto = {title: "Le avventure di Gianni in montagna" }

            library.add(bookDto);

            expect(repoMock.save).toHaveBeenCalledWith({title: "Le avventure di Gianni in montagna"})
        });

        it('should return the saved book id', () => {
            const library = new Library(repoMock);
            const bookDto: BookDto = {title: "Le avventure di Gianni in montagna" }

            const addedBookId = library.add(bookDto);

            expect(addedBookId).toEqual(expect.any(Number))
        });
    });

    describe('get', () => {
        it('should search the book', () => {
            const library = new Library(repoMock);

            library.get('1');

            expect(repoMock.get).toHaveBeenCalled()
        });
    });
});