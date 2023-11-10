import {BookDto} from "./bookDto";

export interface Repo {
    get(bookId: string): BookDto;
    save(book: BookDto): number;
}

export default class Library {
    constructor(private readonly libraryRepo: Repo) {}

    public add(book: BookDto): number {
        if(!book.title)
            throw new Error('Book not valid')
        return this.libraryRepo.save(book);
    }

    get(bookId: string): BookDto {
        let book: BookDto
        try {
            book = this.libraryRepo.get(bookId);
        }catch (e){
            throw new Error('Book not found')
        }
        return book
    }
}