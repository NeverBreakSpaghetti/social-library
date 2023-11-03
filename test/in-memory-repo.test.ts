import {InMemoryRepo} from "../src/inmemory-repo";

describe('InMemoryRepo', () => {
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