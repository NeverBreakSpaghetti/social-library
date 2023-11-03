import {BookDto} from "./bookDto";

export interface Repo {
    save(book: BookDto): number;
}

export default class Library {
    constructor(private readonly libraryRepo: Repo) {}

    public add(book: BookDto): number {
        if(!book.title)
            throw new Error('Book not valid')
        return this.libraryRepo.save(book);
    }
}