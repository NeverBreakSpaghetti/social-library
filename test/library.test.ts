import Library from "../src/library";
import {BookDto, BookWithIdDto} from "../src/bookDto";
import {Repo} from "../src/repo";

let repoMock: Repo
describe('Library', () => {
    beforeAll(() => {
        repoMock = {
            getAllBooks: jest.fn(),
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

        it('should throw an error when input is not a bookDto', () => {
            const library = new Library(repoMock);
            const notABookDto = {title: "Not a bookDto", anotherProperty: "property not in bookDto" }

            expect(()=>library.add(notABookDto)).toThrow('Book not valid');
        });
    });

    describe('get', () => {
        it('should search the book', () => {
            const library = new Library(repoMock);

            library.get('1');

            expect(repoMock.get).toHaveBeenCalled()
        });

        it('should throw an error when book not exists', () => {
            jest.spyOn(repoMock, 'get').mockImplementation(() => {throw new Error('Book not found')})
            const library = new Library(repoMock);

            expect(()=>library.get('notExistingId')).toThrow('Book not found');
        });

        it('should return a BookWithIdDto when book is found', () => {
            jest.spyOn(repoMock, 'get').mockImplementation(():BookWithIdDto => {return {id: '1', title: "Il finto libro di Gianni"}})
            const library = new Library(repoMock);

            const book: BookDto = library.get('1');

            expect(book).toEqual({id: '1', title: "Il finto libro di Gianni"})
        });
    });

    describe('getAllBooks', () => {
        it('should search all books', () => {
            const library = new Library(repoMock);

            library.getAllBooks();

            expect(repoMock.getAllBooks).toHaveBeenCalled()
        });
        it('should throw an error when catalogue is empty', () => {
            jest.spyOn(repoMock, 'getAllBooks').mockImplementation(() => {throw new Error('Empty catalogue')})
            const library = new Library(repoMock);

            expect(()=>library.getAllBooks()).toThrow('Empty catalogue');
        });
        it('should return an array of BookWithIdDto with all books in catalogue when catalogue is not empty', () => {
            jest.spyOn(repoMock, 'getAllBooks').mockImplementation(() => {
                return [
                    {id: '1', title: "Gianni's hitchhiker's guide to the galaxy", author: "Douglas Adams", pages: 42},
                    {id: '2', title: "Gianni's guide to best north Italy pubs", author: "Gianni"},
                ]
            })
            const library = new Library(repoMock);

            const books = library.getAllBooks();

            expect(books.length).toBe(2)
            expect(books[0]).toEqual({id: '1', title: "Gianni's hitchhiker's guide to the galaxy", author: "Douglas Adams", pages: 42})
            expect(books[1]).toEqual({id: '2', title: "Gianni's guide to best north Italy pubs", author: "Gianni"})
        });
    });

    describe('generateId', () => {
        it('should generate a new uuid', () => {
            const library = new Library(repoMock);

            expect(library.generateId()).toEqual(expect.any(String));
        });
        it('should generate different uuids', () => {
            const library = new Library(repoMock);

            expect(library.generateId()).not.toEqual(library.generateId());
        });
    });
});