import {BookRepo} from "./book-repo";
import {v4 as uuid} from 'uuid';
import {BookDto} from "./book-dto";
import {BookEntity} from "./book-entity";
import inMemoryBookRepoSingletonInstance from "./inmemory-book-repo";

export default class BookService {
    private readonly bookRepo: BookRepo
    constructor(repo?: BookRepo) {
        if (repo)
            this.bookRepo = repo
        else
            this.bookRepo = inMemoryBookRepoSingletonInstance
    }

    public add(id: string, book: BookDto): void {
        const bookEntity: BookEntity = BookEntity.create(id, book)
        this.bookRepo.save(bookEntity);
    }

    get(bookId: string): BookEntity | null {
        return this.bookRepo.get(bookId);
    }

    getAllBooks = (): BookEntity[] => {
        return this.bookRepo.getAllBooks()
    }

    generateId(): string {
        return uuid()
    }
}