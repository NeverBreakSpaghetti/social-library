import {InMemoryRepo} from "../src/inmemory-repo";
import {getAllBooks} from "../src/controller";

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

            console.log(firstId, secondId)

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
    });
});