import {BookDto} from "./book-dto";

export class BookEntity {
    private constructor(private readonly id: string, private title: string, private author?: string, private pages?: number) {}
    static create(id: string, book: BookDto) {
        return new BookEntity(id, book.title, book.author, book.pages);
    }
}