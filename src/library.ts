import {Repo} from "./repo";
import {v4 as uuid} from 'uuid';
import {BookDto} from "./bookDto";
import {BookEntity} from "./book-entity";

export default class Library {
    constructor(private readonly libraryRepo: Repo) {}

    public add(id: string, book: BookDto): void {
        const bookEntity: BookEntity = BookEntity.create(id, book)
        this.libraryRepo.save(bookEntity);
    }

    get(bookId: string): BookEntity {
        let book: BookEntity
        try {
            book = this.libraryRepo.get(bookId);
        }catch (e){
            throw new Error('Book not found')
        }
        return book
    }

    getAllBooks = (): BookEntity[] => {
        let books: BookEntity[]
        try {
            books = this.libraryRepo.getAllBooks()
        }catch (e){
            throw new Error('Empty catalogue')
        }
        return books
    }

    generateId(): string {
        return uuid()
    }
}