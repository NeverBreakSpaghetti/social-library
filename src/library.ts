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

    get(bookId: string) {
        try {
            this.libraryRepo.get(bookId);
        }catch (e){}
        if (bookId === '1')
            return {title: "Il finto libro di Gianni"}
    }
}