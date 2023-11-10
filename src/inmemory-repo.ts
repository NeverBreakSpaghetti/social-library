import {Repo} from "./library";
import {BookDto} from "./bookDto";

export class InMemoryRepo implements Repo{
    private books: BookDto[] = [];
    save(book: BookDto): number {
        return this.books.push(book) -1;
    }

    get(bookId: string): BookDto {
        return this.books[parseInt(bookId)]
    }

}