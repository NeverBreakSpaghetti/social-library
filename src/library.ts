import {BookDto} from "./bookDto";

export interface Repo {
    save(book: BookDto): void;
}

export default class Library {
    constructor(private readonly libraryRepo: Repo) {}

    public add(book: BookDto){
        if(!book.title)
            throw new Error('Book not valid')
        this.libraryRepo.save(book);
    }
}