import {BookDto} from "./bookDto";

export class BookEntity {
    private constructor(private readonly id: string, private title: string, private author?: string, private pages?: number) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
    static create(id: string, book: Book) {
        return new BookEntity(id, book.title, book.author, book.pages);
    }
}