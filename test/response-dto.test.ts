import {BookEntity} from "../src/book-entity";
import {mapBookArrayToResponseBookDtoArray, mapBookToResponseBookDto} from "../src/response-dto";

describe('ResponseBookDto', () => {
    describe('mapBookToResponseBookDto', () => {
        it('should map BookEntity to ResponseBookDto', () => {
            const bookEntity = BookEntity.create('uuid',{title: "Dr. Bombelli e Mr. EvilGianni", author: "Robert Louis Stevenson", pages: 141})

            expect(mapBookToResponseBookDto(bookEntity)).toEqual({id: 'uuid', title: "Dr. Bombelli e Mr. EvilGianni", author: "Robert Louis Stevenson", pages: 141})
        });
    });

    describe('mapBookArrayToResponseBookDtoArray', () => {
        it('should map an empty BookEntity array to an empty ResponseBookDto array', () => {
            expect(mapBookArrayToResponseBookDtoArray([])).toEqual([])
        });

        it('should map BookEntity array to ResponseBookDto array', () => {
            const bookEntity1 = BookEntity.create('uuid1',{title: "Bombelli dev trainer", author: "O'Reilly", pages: 1000})
            const bookEntity2 = BookEntity.create('uuid2',{title: "Bombelli dev coach", author: "Manning"})
            const bookEntity3 = BookEntity.create('uuid3',{title: "Bombelli dev mentor"})
            const bookEntityArray = [bookEntity1, bookEntity2, bookEntity3]

            expect(mapBookArrayToResponseBookDtoArray(bookEntityArray)).toEqual([
                {id: 'uuid1', title: "Bombelli dev trainer", author: "O'Reilly", pages: 1000},
                {id: 'uuid2', title: "Bombelli dev coach", author: "Manning"},
                {id: 'uuid3', title: "Bombelli dev mentor"}
            ])
        });
    });
});