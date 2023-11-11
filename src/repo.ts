import {BookDto, BookWithIdDto} from "./bookDto";

export interface Repo {
    get(bookId: string): BookWithIdDto;
    save(book: BookDto): number;
}