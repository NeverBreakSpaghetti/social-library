import BookService from "../../src/book/book-service";
import {BookRepo} from "../../src/book/book-repo";
import {BookDto} from "../../src/book/book-dto";
import {BookEntity} from "../../src/book/book-entity";

let repoMock: BookRepo
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
        it('should accept a book and an id as input', () => {
            const library = new BookService(repoMock);
            const book: BookDto = {title: "Le avventure di Gianni in montagna" }
            const id = "uuid"

            expect(()=>library.add(id, book)).not.toThrow();
        });

        it('should save the book', () => {
            const library = new BookService(repoMock);
            const book: BookDto = {title: "Le avventure di Gianni in montagna" }
            const id = "uuid"

            library.add(id, book);

            expect(repoMock.save).toHaveBeenCalledWith({id: "uuid", title: "Le avventure di Gianni in montagna"})
        });
    });

    describe('get', () => {
        it('should search the book', () => {
            const library = new BookService(repoMock);

            library.get('uuid');

            expect(repoMock.get).toHaveBeenCalled()
        });

        it('should return null when book not exists', () => {
            jest.spyOn(repoMock, 'get').mockImplementation(() => null)
            const library = new BookService(repoMock);

            expect(library.get('notExistingUuid')).toEqual(null)
        });

        it('should return a BookEntity when book is found', () => {
            jest.spyOn(repoMock, 'get').mockImplementation(():BookEntity => {return BookEntity.create('uuid', {title: "Il finto libro di Gianni"})})
            const library = new BookService(repoMock);

            const book = library.get('uuid');

            expect(book).toEqual({id: 'uuid', title: "Il finto libro di Gianni"})
        });
    });

    describe('getAllBooks', () => {
        it('should search all books', () => {
            const library = new BookService(repoMock);

            library.getAllBooks();

            expect(repoMock.getAllBooks).toHaveBeenCalled()
        });
        it('should throw an error when catalogue is empty', () => {
            jest.spyOn(repoMock, 'getAllBooks').mockImplementation(() => {throw new Error('Empty catalogue')})
            const library = new BookService(repoMock);

            expect(()=>library.getAllBooks()).toThrow('Empty catalogue');
        });
        it('should return an array of BookWithIdDto with all books in catalogue when catalogue is not empty', () => {
            jest.spyOn(repoMock, 'getAllBooks').mockImplementation(() => {
                return [
                    BookEntity.create('uuid1', {title: "Gianni's hitchhiker's guide to the galaxy", author: "Douglas Adams", pages: 42}),
                    BookEntity.create('uuid2', {title: "Gianni's guide to best north Italy pubs", author: "Gianni"}),
                ]
            })
            const library = new BookService(repoMock);

            const books = library.getAllBooks();

            expect(books.length).toBe(2)
            expect(books[0]).toEqual({id: 'uuid1', title: "Gianni's hitchhiker's guide to the galaxy", author: "Douglas Adams", pages: 42})
            expect(books[1]).toEqual({id: 'uuid2', title: "Gianni's guide to best north Italy pubs", author: "Gianni"})
        });
    });

    describe('generateId', () => {
        it('should generate a new uuid', () => {
            const library = new BookService(repoMock);

            expect(library.generateId()).toEqual(expect.any(String));
        });
        it('should generate different uuids', () => {
            const library = new BookService(repoMock);

            expect(library.generateId()).not.toEqual(library.generateId());
        });
    });
});