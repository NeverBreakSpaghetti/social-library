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

    get(bookId: string): BookEntity | null {
        const book = this.libraryRepo.get(bookId);
        if (!book)
            return null
        return book
    }

    getAllBooks = (): BookEntity[] => {
        return this.libraryRepo.getAllBooks()
    }

    generateId(): string {
        return uuid()
    }
}