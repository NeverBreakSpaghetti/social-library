import Library from "../src/library";
import {Repo} from "../src/repo";
import {Book} from "../src/book";
import {BookEntity} from "../src/book-entity";

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
        it('should accept a book and an id as input', () => {
            const library = new Library(repoMock);
            const book: Book = {title: "Le avventure di Gianni in montagna" }
            const id = "uuid"

            expect(()=>library.add(id, book)).not.toThrow();
        });

        it('should save the book', () => {
            const library = new Library(repoMock);
            const book: Book = {title: "Le avventure di Gianni in montagna" }
            const id = "uuid"

            library.add(id, book);

            expect(repoMock.save).toHaveBeenCalledWith({id: "uuid", title: "Le avventure di Gianni in montagna"})
        });
    });

    describe('get', () => {
        it('should search the book', () => {
            const library = new Library(repoMock);

            library.get('uuid');

            expect(repoMock.get).toHaveBeenCalled()
        });

        it('should throw an error when book not exists', () => {
            jest.spyOn(repoMock, 'get').mockImplementation(() => {throw new Error('Book not found')})
            const library = new Library(repoMock);

            expect(()=>library.get('notExistingUuid')).toThrow('Book not found');
        });

        it('should return a BookEntity when book is found', () => {
            jest.spyOn(repoMock, 'get').mockImplementation(():BookEntity => {return BookEntity.create('uuid', {title: "Il finto libro di Gianni"})})
            const library = new Library(repoMock);

            const book: BookEntity = library.get('uuid');

            expect(book).toEqual({id: 'uuid', title: "Il finto libro di Gianni"})
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
                    BookEntity.create('uuid1', {title: "Gianni's hitchhiker's guide to the galaxy", author: "Douglas Adams", pages: 42}),
                    BookEntity.create('uuid2', {title: "Gianni's guide to best north Italy pubs", author: "Gianni"}),
                ]
            })
            const library = new Library(repoMock);

            const books = library.getAllBooks();

            expect(books.length).toBe(2)
            expect(books[0]).toEqual({id: 'uuid1', title: "Gianni's hitchhiker's guide to the galaxy", author: "Douglas Adams", pages: 42})
            expect(books[1]).toEqual({id: 'uuid2', title: "Gianni's guide to best north Italy pubs", author: "Gianni"})
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