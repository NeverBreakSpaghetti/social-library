import {Repo} from "./library";
import {BookDto, BookWithIdDto} from "./bookDto";

export class InMemoryRepo implements Repo{
    private books: BookDto[] = [];
    save(book: BookDto): number {
        return this.books.push(book) -1;
    }

    get(bookId: string): BookWithIdDto {
        const book = this.books[parseInt(bookId)]
        if(!book)
            throw new Error('Book not found')
        return {...book, id: bookId}
    }

}