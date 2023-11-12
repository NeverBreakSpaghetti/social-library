import {Repo} from "./repo";
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

    getAllBooks(): BookWithIdDto[] {
        if(this.books.length === 0)
            throw new Error('Catalogue is empty')
        return this.books.map((book, index): BookWithIdDto => ({...book, id: index.toString()}))
    }

}