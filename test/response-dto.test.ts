import {BookEntity} from "../src/book-entity";
import {mapBookToResponseBookDto} from "../src/response-dto";

describe('ResponseBookDto', () => {
    describe('mapBookToResponseBookDto', () => {
        it('should map BookEntity to ResponseBookDto', () => {
            const bookEntity = BookEntity.create('uuid',{title: "Dr. Bombelli e Mr. EvilGianni", author: "Robert Louis Stevenson", pages: 141})

            expect(mapBookToResponseBookDto(bookEntity)).toEqual({id: 'uuid', title: "Dr. Bombelli e Mr. EvilGianni", author: "Robert Louis Stevenson", pages: 141})
        });
    });
});