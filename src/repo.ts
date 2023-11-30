import {BookEntity} from "./book-entity";

export interface Repo {
    getAllBooks(): BookEntity[];
    get(bookId: string): BookEntity | null;
    save(book: BookEntity): void;
}