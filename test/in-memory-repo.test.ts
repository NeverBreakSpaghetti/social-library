import {InMemoryRepo} from "../src/inmemory-repo";

describe('InMemoryRepo', () => {
    it('should save a book returning his id', () => {
        const repo = new InMemoryRepo()
        const book = {title: 'Le memorie di uno Scrum Master'}

        expect(repo.save(book)).toEqual(expect.any(Number))
    });
});