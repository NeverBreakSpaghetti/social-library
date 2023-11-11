import {BookDto, BookWithIdDto, isValid} from "./bookDto";
import {Repo} from "./repo";

export default class Library {
    constructor(private readonly libraryRepo: Repo) {}

    public add(book: BookDto): number {
        if(!isValid(book) || !book.title)
            throw new Error('Book not valid')
        return this.libraryRepo.save(book);
    }

    get(bookId: string): BookWithIdDto {
        let book: BookWithIdDto
        try {
            book = this.libraryRepo.get(bookId);
        }catch (e){
            throw new Error('Book not found')
        }
        return book
    }

    getAllBooks = () => {
        throw new Error('Not implemented')
    }
}