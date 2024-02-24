import {InMemoryBookRepo} from "../../src/book/inmemory-book-repo";
import {BookDto} from "../../src/book/book-dto";
import {BookEntity} from "../../src/book/book-entity";

describe('InMemoryRepo', () => {

    describe('save', () => {
        it('should save a book', () => { // stesso test sotto => posso unire i due test
            const repo = new InMemoryBookRepo()
            const book: BookDto = {title: 'Le memorie di uno Scrum Master'}
            const id = "uuid"

            repo.save(BookEntity.create(id, book))

            expect(repo.get("uuid")).toEqual({...book, id: "uuid"})
        });
    })

    describe('get', () => {
        it('should return a bookWithIdDto when book exists', () => { // stesso test supra => posso unire i due test
            const repo = new InMemoryBookRepo()
            const book = {title: 'I talk di un Extreme Programmer'}
            const id = "uuid"

            repo.save(BookEntity.create(id, book))

            expect(repo.get("uuid")).toEqual({...book, id: "uuid"})
        });
        it('should return null when book exists', () => {
            const repo = new InMemoryBookRepo()

            expect(repo.get("uuid")).toEqual(null)
        });
    });

    describe('getAllBooks', () => {
        it('should return an empty array when no books', () => {
            const repo = new InMemoryBookRepo()

            expect(repo.getAllBooks()).toEqual([])
        });
        it('should return all books', () => {
            const repo = new InMemoryBookRepo()
            const firstBook: BookDto = {title: 'I mille workshop di Gianni', pages: 1000}
            const firstId = 'uuid1'
            const secondBook: BookDto = {title: 'I consigli di un navigato mentor', author: 'Gianni'}
            const secondId = 'uuid2'

            repo.save(BookEntity.create(firstId, firstBook))
            repo.save(BookEntity.create(secondId, secondBook))

            expect(repo.getAllBooks()).toEqual([
                {...firstBook, id: firstId},
                {...secondBook, id: secondId}
            ])
        });
        it('should not modify internal bookEntities when edit array resulting from getAllBooks', () => {}) //TODO
    });
});