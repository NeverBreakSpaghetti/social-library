import {InMemoryRepo} from "../src/inmemory-repo";
import {getAllBooks} from "../src/controller";
import {BookDto} from "../src/bookDto";

describe('InMemoryRepo', () => {
    describe('save', () => {
        it('should save a book returning his id', () => {
            const repo = new InMemoryRepo()
            const book = {title: 'Le memorie di uno Scrum Master'}

            expect(repo.save(book)).toEqual(expect.any(Number))
        });
        it('should save multiple books returning different ids', () => {
            const repo = new InMemoryRepo()
            const firstBook = {title: 'Le memorie di uno Scrum Master'}
            const secondBook = {title: 'La barba saggia che racconta XP'}

            const firstId = repo.save(firstBook)
            const secondId = repo.save(secondBook)

            expect(firstId).not.toEqual(secondId)
        });
    });

    describe('get', () => {
        it('should return a bookWithIdDto when book exists', () => {
            const repo = new InMemoryRepo()
            const book = {title: 'I talk di un Extreme Programmer'}

            const bookId = repo.save(book)

            expect(repo.get(bookId.toString())).toEqual({...book, id: bookId.toString()})
        });
        it('should return en error when book exists', () => {
            const repo = new InMemoryRepo()

            expect(()=>repo.get('0')).toThrow()
        });
    });

    describe('getAllBooks', () => {
        it('should return an empty array when no books', () => {
            const repo = new InMemoryRepo()

            expect(()=> repo.getAllBooks()).toThrow('Catalogue is empty')
        });
        it('should return all books', () => {
            const repo = new InMemoryRepo()
            const firstBook: BookDto = {title: 'I mille workshop di Gianni', pages: 1000}
            const secondBook: BookDto = {title: 'I consigli di un navigato mentor', author: 'Gianni'}

            const firstBookId = repo.save(firstBook)
            const secondBookId =  repo.save(secondBook)

            expect(repo.getAllBooks()).toEqual([
                {...firstBook, id: firstBookId.toString()},
                {...secondBook, id: secondBookId.toString()}
            ])
        });
    });
});