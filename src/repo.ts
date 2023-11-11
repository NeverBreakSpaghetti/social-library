import {BookDto, BookWithIdDto} from "./bookDto";

export interface Repo {
    getAllBooks(): BookWithIdDto[];
    get(bookId: string): BookWithIdDto;
    save(book: BookDto): number;
}