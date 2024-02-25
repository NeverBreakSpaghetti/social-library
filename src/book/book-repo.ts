import {BookEntity} from "./book-entity";

export interface BookRepo {
    getAllBooks(): BookEntity[];
    get(bookId: string): BookEntity | null;
    save(book: BookEntity): void;
    remove(bookId: string): void;
}