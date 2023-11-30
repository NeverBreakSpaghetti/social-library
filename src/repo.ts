import {BookEntity} from "./book-entity";

export interface Repo {
    getAllBooks(): BookEntity[];
    get(bookId: string): BookEntity;
    save(book: BookEntity): void;
}